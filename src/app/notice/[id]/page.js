import Control from "@/app/components/Control";

export default async function Notice(props) {
  const response = await fetch(`https://my-json-server.typicode.com/sungdongyoon/notice-board/notices/${props.params.id}`, {cache: 'no-store'});
  const result = await response.json();
  return (
    <div className="notice">
      <div className="notice_header">
        <span className="announcement">공지사항</span>
        <h1 className="notice_title">{result.title}</h1>
        <span className="notice_time">{result.time}</span>
      </div>
      <div className="notice_content">
        <span>{result.content}</span>
      </div>
      <Control/>
    </div>
  )
}