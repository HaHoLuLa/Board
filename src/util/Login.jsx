import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const [ data, setData ] = useState({});
  const [ form, setForm ] = useState({
    id: '',
    pw: '',
  });
  const [ errorMsg, setErrorMsg ] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // 데이터 상태가 업데이트되고, 그 상태에 따라 네비게이션을 결정합니다.
    if (data.status) {
      nav(-1, { replace: true });
    }
  }, [data, nav]); // 의존성 배열에 data와 nav를 추가

  useEffect(() => {
    if (data.reason === "error") {
      setErrorMsg(true);
      const timer = setTimeout(() => {
        setErrorMsg(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data.reason]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_URL}/login.php`, 
    // await axios.post('/api/login.php', 
    form, {
      withCredentials: true,
    })
    .then(res => {
      setData(res.data); 
      // console.log(res.data);
    })
    .catch(e => console.error(e));
  }

  // if (data.status) {
  //   nav(-1, {replace: true});
  // }

  return (
    <>
      <Helmet>
        <title>HaHoLuLa - Login</title>
      </Helmet>
      <main style={{}}>
        <div className='login-box'>
          <h2>Login</h2>
          {errorMsg && <b style={{color: "red"}}>다시 입력해주세요</b>}
          <form onSubmit={handleSubmit}>
            <input name='id' type="text" placeholder=" 아이디" onChange={handleChange}/>
            <input name='pw' type="password" placeholder=" 비밀번호" onChange={handleChange}/>
            <button className='button-design'>로그인</button>
            {/* <button disabled>회원가입</button><button disabled>아이디/비번찾기</button> */}
          </form>
        </div>
      </main>
    </>
  )
}