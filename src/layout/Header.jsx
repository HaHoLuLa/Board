import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
// import Wrapper from "./Wrapper";

export default function Header() {
  const location = useLocation();
  const [ user, setUser ] = useState(null);
  // const [ color, setColor ] = useState("#bc2652");
  const [ active, setActive ] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/authutil.php`,
    // axios.get('/api/authutil.php',
        {
          withCredentials: true,
        })
        .then(response => {
          // console.log(response.data);
          setUser(response.data.name);
        })
        .catch(e => console.error(e));
  }, [location.pathname]);

  // useEffect(() => {
  //   if (user !== null) {
  //     axios.get(`${process.env.REACT_APP_URL}/color.php?user=${user}`)
  //     .then(res => {setColor(res.data.color);} )
  //     .catch(e => console.error(e))
  //   }
  // }, [user])

  const handleClick = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      try {
        await axios.get(`${process.env.REACT_APP_URL}/logout.php`,
        // await axios.get('/api/logout.php',
        {
          withCredentials: true,
        });
        setUser(null);
        nav('/board/1', { replace: true });
      } catch (e) {
        console.error(e);
      }
      setActive(!active)
    }
  }

  // const handleColor = async () => {
  //   const color = window.prompt("CSS 색깔 입력 (#기호 등 특수문자 사용불가)");
  //   // console.log(color);
  //   if (color) {
  //     try {
  //       // console.log(color, user)
  //       await axios.post(`${process.env.REACT_APP_URL}/color.php?color=${color}&user=${user}`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // }

  // const handleToggle = () => {
  //   setActive(!active);
  // }
  
  
  // console.log(user);

  return (
    <>
      {/* <Helmet>
        <style>
          {`
          * {
            --theme-color: ${color === undefined || color === null ? "#bc2652" : color}
          }
          `}
        </style>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={`${color === undefined ? "#bc2652" : color}`} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={`${color === undefined ? "#bc2652" : color}`} />
      </Helmet> */}
      <header>
      {/* <div style={active ?  {display: "flex", top: "70px", right: "0", position: "absolute", backgroundColor: "white", zIndex: "10", flexDirection: "column", justifyContent: "flex-end", textAlign: "right"} : {display: "none"} }>
        <div>
          <span onClick={handleColor}>색 설정</span>
        </div>
        <div>
          <span onClick={handleClick}>로그아웃</span>
        </div>
      </div> */}
        <div className="logo">
          <Link to={'/'}><h1>HaHoLuLa</h1></Link>
        </div>

        {location.pathname === '/login' ? 
        (
        <>
        </>
        ) : (user ? (
        <div className="top-nav">
          <p onClick={handleClick} style={{cursor: "pointer", userSelect: "none"}}>{user}</p>
        </div>
        ) : (
        <div className="top-nav">
          <Link to={'/login'}><p>로그인</p></Link>
        </div>
        ))}
      </header>
      <Outlet context={{ user }} />
    </>
  )
}