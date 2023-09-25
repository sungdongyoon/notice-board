import Control from "@/app/components/Control";
import Content from "@/app/components/Content";

export default async function Notice(props) {
  const response = await fetch(`http://localhost:9999/notices/${props.params.id}`, {cache: 'no-store'});
  const result = await response.json();
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