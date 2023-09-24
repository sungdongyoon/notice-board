"use client"
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id
  return (
    <div className="buttons">
      <Link href={`/`}>
        <button className="list_btn">목록으로</button>
      </Link >
      <Link href={`/update/${id}`}>
        <button className="update_btn">수정</button>
      </Link>
      <button className="delete_btn" onClick={() => {
        if(confirm("정말 삭제하시겠습니까?")) {
          const options = {method: 'DELETE'}
          fetch('https://my-json-server.typicode.com/sungdongyoon/notice-board/notices/'+ id, options)
            .then((response) => response.json())
            .then((result) => {
              router.push('/');
              router.refresh();
            })
        }
      }}>삭제</button>
    </div>
  )
};

export default Control;