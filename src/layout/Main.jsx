import Board from "./Board";
import PageNation from "../util/PageNation";
import CenterNav from "../util/CenterNav";
import { Helmet } from "react-helmet-async";

export default function Main() {
  return (
    <>
      <Helmet>
        <title>HaHoLuLa</title>
      </Helmet>
      <main>
        <CenterNav />

        <Board />

        <PageNation />
      </main>
    </>
  )
}