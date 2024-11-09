import { NavLink, Link, useParams,  } from "react-router-dom"; // useOutletContext
import axios from 'axios';
import { useEffect, useState } from "react";

export default function PageNation() {
  const [ firstLink, setFirstLink ] = useState();
  const [ linkList, setLinkList ] = useState([]);
  const [ lastLink, setLastLink ] = useState();
  const [ error, setError ] = useState(null);
  const [ isLoading, setLoading ] = useState(true);
  const { page } = useParams();
  const pageNum = page ? page : 1;
  // const { color } = useOutletContext();
  const activeStyle = {
    color: process.env.REACT_APP_POINT_COLOR,
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/pagenation.php?page=${pageNum}`)
    // axios.get(`/api/pagenation.php?page=${pageNum}`)
    .then(response => {
      setFirstLink(response.data.firstLink);
      setLinkList(response.data.linkList);
      setLastLink(response.data.lastLink);
    })
    .catch(e => setError(e))
    .finally(() => setLoading(false));
  }, [pageNum]);

  if (error) return <div className="pagenation">{isLoading ? "Loading..." : "ERROR"}</div>

  if (firstLink !== undefined) {
    return (
      <div className="pagenation">
        {firstLink ? (<Link to={`/board/${firstLink}`} style={{color: "#cccccc"}}>&lt;</Link>) : ""}
        {linkList.map((link) => (
          <NavLink key={link} style={({isActive}) => isActive || (pageNum === 1 && link === 1) ? activeStyle : undefined} to={`/board/${link}`}>{link}</NavLink>
        ))}
        {lastLink ? (<Link to={`/board/${lastLink}`} style={{color: "#cccccc"}}>&gt;</Link>) : ""}
      </div>
    )
  }

  return <div className="pagenation">{isLoading ? "Loading..." : "ERROR"}</div>
}