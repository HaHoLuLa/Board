import GetBoard from "../util/GetBoard";

export default function Board() {  

  return (
    <div className="board">
      {/* <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성시간</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <GetBoard />
        </tbody>
      </table> */}
      <div className="table">
        <div className="thead">
          <span>번호</span>
          <span>제목</span>
          <span>작성자</span>
          <span>작성시간</span>
          <span>조회수</span>
        </div>
        <GetBoard />
      </div>
    </div>
  )
}