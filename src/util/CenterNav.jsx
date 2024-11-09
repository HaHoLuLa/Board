import { useNavigate, useOutletContext } from "react-router-dom";

export default function CenterNav() {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const handleClick = () => {
    navigate('/write')
  }

  return (
    <div className="center-nav">
      {/* <div>
        <input type="text" placeholder="찾을 내용 입력" onChange={handleChange} />
        <i className="fa-solid fa-magnifying-glass" style={{color: "cornflowerblue"}}></i>
      </div> */}

      {user && <button className="button-design" onClick={handleClick}>글쓰기</button>}
    </div>
  )
}

