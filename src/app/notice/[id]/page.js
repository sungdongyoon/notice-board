import Control from "@/app/components/Control";
import Content from "@/app/components/Content";
import { connectDB } from "@/utill/database";

export default async function Notice(props) {
  const response = await fetch(`http://localhost:9999/notices/${props.params.id}`, {cache: 'no-store'});
  const result = await response.json();

  // const id = props.params.id;

  // let client = await connectDB;
  // const db = client.db("yoondongsung");
  // let result = await db.collection("notice-board").find().toArray();
  // result = result.map((a)=>{
  //   a._id = a._id.toString()
  //   return a
  // })

  return (
    <div className="notice">
      <div className="notice_header">
        <span className="announcement">공지사항</span>
        <h1 className="notice_title">{result.title}</h1>
        <span className="notice_time">{result.time}</span>
      </div>
      <Content result={result}/>
      <Control/>
    </div>
  )
}