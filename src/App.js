// import Board from "./layout/Board";
import './styles/Board.css';
import "./styles/page.css"
import Header from "./layout/Header";
import Main from "./layout/Main";
import Write from "./util/Write";
import View from "./util/View";
import Login from './util/Login.jsx';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import { AnimatePresence } from 'framer-motion';


const Home = () => <Navigate to={`/board/1`} replace />

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [pathname])
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
    
      <ScrollToTop />
      {/* <AnimatePresence> */}

          <Routes key={pathname}>
            <Route element={<Header />} >
              <Route index element={<Main />} />
              <Route path="/board/:page" element={<Main />} />
                {/* <Route path=":page" element={<Board />} />
              </Route> */}
              <Route path="/view/:num" element={<View />} />
              <Route path="/write" element={<Write />}>
                <Route path=':num' element={<Write />} />
              </Route>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
              {/* </AnimatePresence> */}
    </>
  )
}