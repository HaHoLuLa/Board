import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { useNavigate, useParams, useLocation } from "react-router-dom"
import ReactQuill, { Quill } from 'react-quill';
import '../styles/quill.snow.css';
import { useState, useEffect, useMemo, useRef } from "react"; // , useMemo
import axios from 'axios';
import { Helmet } from 'react-helmet-async';


export default function Write() {
  const [ content, setContent ] = useState('');
  const [ title, setTitle ] = useState('');
  const nav = useNavigate();
  const { num } = useParams();
  const location = useLocation();
  const contents = location.state?.contents;
  const titles = location.state?.titles;
  const textRef = useRef(null);
  const modules = useMemo(() => {
    return {
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: {
      container: [
      [{ 'header': [1,2,3,4,5,6,false] }, {'size': ['small',false,'large','huge']}], // { 'size': [] }  { 'font': [] },
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'], // code-block
      [{'script':'sub'},{'script':'super'}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{'align': []}],
      [{'direction': 'rtl'}],
      ['image', 'link', 'video'], //'image',
      [{ 'color': []}, { 'background': []}],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    },
    handlers: {
      image: imageHandler,
    },
  }}
  }, []);

  useEffect(() => {
    if (num) {
      setContent(contents); // num 값이 있을 경우 content 값을 설정
      setTitle(titles);
    }
  }, [num, contents, titles]);

  // useEffect(() => {
  //   // setTimeout(() => textRef.current.getEditor().domNode.scrollTo({
  //   //   top: textRef.current.getEditor().scroll.domNode.scrollHeight,
  //   //   behavior: 'smooth' // 부드러운 스크롤 효과 적용
  //   // }), 10);
  //   if (textRef.current) {
  //     const quill = textRef.current.getEditor();
  //     quill.scroll.domNode.scrollTop = quill.scroll.domNode.scrollHeight;
  //   }
  //   // if (textRef.current) {
  //   //   const quill = textRef.current.getEditor();

  //   //   quill.on("text-change", () => {
  //     // quill.scroll.domNode.scrollTop = quill.scroll.domNode.scrollHeight;
  //   //     // console.log(textRef.current.editor.scroll);
  //   //   })
  //   // }
  // }, [content])

  const handleChange = (value) => {
    setContent(value);
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleWrite = async (e) => {
    let data = num ? {
      type: 1,
      num: num,
      title: title,
      content: content,
    } : {
      title: title,
      content: content
    };

    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_URL}/write.php`,
    // await axios.post('/api/write.php',
    data, {
      withCredentials: true,
    })
    .then((res) => { 
      // console.log(res.data); console.log(data); 
      nav('/board/1', {replace:true})})
    .catch(e => console.error(e));
  }

  function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('사진의 URL을 넣어주세요.');
    if(value){
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}


  return (
    <>
      <Helmet>
        <title>HaHoLuLa - Write</title>
      </Helmet>
      <main>
        <h2>Write</h2>
        <form onSubmit={handleWrite}>
          <input name="title" className="title-inp" placeholder="제목을 작성해주세요" onChange={handleChangeTitle} value={title} />
          <ReactQuill
            ref={textRef}
            modules={modules}
            placeholder="내용을 작성해주세요"
            onChange={handleChange}
            value={content}
            // style={{maxHeight: "50vh", overflowY: "auto"}}
          />

          <div className="button-box">
            <button className="button-design">작성</button>
            {/* <button className="button-design" onClick={handleClick}>돌아가기</button> */}
          </div>
        </form>
      </main>
    </>
  )
}