import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function View() {
  const { num } = useParams();
  const [ data, setData ] = useState({});
  const nav = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/get_board.php?num=${num}`)
    // axios.get(`/api/get_board.php?num=${num}`)
    .then(res => setData(res.data))
    .catch(e => console.error(e));
  }, [num]);

  const handleClick = () => {
    nav(-1);
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      await axios.get(`${process.env.REACT_APP_URL}/delete.php?num=${num}`)
      // await axios.get(`/api/delete.php?num=${num}`)
      .catch(e => console.error(e));
      nav(-1);
    }
  }

  return (
    <>
      <Helmet>
        <title>{`HaHoLuLa - ${data.title}`}</title>
      </Helmet>
      <main>
        <h3>{data.title}</h3>
        <div className="info">
          <p>{data.writer}</p>
          <div>
            <p>작성일&nbsp;{data.regtime}</p>
            <p>조회&nbsp;{data.hits}</p>
          </div>
        </div>
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: data.content }} style={{width: "auto", border: "solid 1px #cccccc"}}/>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          {user === data.writer && (
            <>
              <Link to={`/write/${num}`}  state={{ titles: data.title, contents: data.content }} >
                <input type="button" className="button-design" style={{margin: "15px 0"}} value={"수정"} />
              </Link>
              <input type="button" className="button-design" style={{margin: "15px 5px"}} onClick={handleDelete} value={'삭제'} />
            </>
          )}
          <button className="button-design" onClick={handleClick} style={{margin: "15px 0"}}>목록으로</button>
        </div>
      </main>
    </>
  )
}