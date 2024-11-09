import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

export default function GetBoard() {
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ isLoading, setLoading ] = useState(true);
  const { page } = useParams();
  const pageNum = page ? page : 1;
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/get_board.php?page=${pageNum}`)
    // axios.get(`/api/get_board.php?page=${pageNum}`)
    // axios.get(`http://localhost:8080/api/get-boards?page=${pageNum}&listSize=30`) // listSize 생략 가능
      .then(res => setData(res.data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [pageNum]);

  const handleDate = (date) => {
    let today = new Date(); // 현재 날짜와 시간을 가져옵니다

    let year = today.getFullYear(); // 연도를 가져옵니다
    let month = today.getMonth() + 1; // 월을 가져오는데, 월은 0부터 시작하므로 +1 해줍니다
    let day = today.getDate(); // 일을 가져옵니다

    // 월과 일이 한 자리 숫자인 경우 앞에 0을 붙여 두 자리로 만듭니다
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    let formattedDate = year + '-' + month + '-' + day; // YYYY-MM-DD 형식으로 날짜를 포맷합니다

    return formattedDate === date

  }

  if (error) return /*<tr><td colSpan={5}>ERROR</td></tr>*/ <div style={{textAlign: "center"}}>ERROR</div>

  if (data.length > 0) {
      return (
        <>
          {data.map((i) => (
            // <tr key={i.num}>
            //   <td>{i.num}</td>
            //   <td><Link to={`/view/${i.num}`}>{i.title}</Link></td>
            //   <td>{i.writer}</td>
            //   <td>{i.regtime}</td>
            //   <td>{i.hits}</td>
            // </tr>
            <Link to={`/view/${i.num}`}  key={i.num}>
            <div className='tbody'>
              <span>{i.num}</span>
              <span>{i.title}</span>
              <span>{i.writer}</span>
              <span>{handleDate(i.regtime.split(" ")[0]) ? 
              `${i.regtime.split(" ")[1]} ${i.regtime.split(" ")[2] !== undefined ? i.regtime.split(" ")[2] : ""}` : 
              `${i.regtime.split(" ")[0]} ${i.regtime.split(" ")[2] !== undefined ? i.regtime.split(" ")[2] : ""}`}</span>
              <span>{i.hits}</span>
            </div>
            </Link>
          ))}
        </>
      );
    }

  // return <tr><td colSpan={5}>{isLoading ? 'Loading...' : 'ERROR'}</td></tr>;
  return <div style={{textAlign: "center"}}>{isLoading ? 'Loading...' : 'ERROR'}</div>;
}