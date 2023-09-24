"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import Tinymce from "@/app/components/Tinymce";
import dayjs from "dayjs";

export default function Update () {
  const [title, setTitle] = useState();
  const [time, setTime] = useState();
  const [content, setContent] = useState();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch('https://my-json-server.typicode.com/sungdongyoon/notice-board/notices/'+ id)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setTitle(result.title);
        setTime(result.time);
        setContent(result.content);
      })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, time }),
    };
    fetch(`https://my-json-server.typicode.com/sungdongyoon/notice-board/notices/`+ id, options)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        const lastid = result.id;
        router.refresh();
        router.push(`/notice/${lastid}`);
      }
    )
  }

  const handleTitleValue = (e) => {
    setTitle(e.target.value);
    const now = dayjs();
    setTime(now.format("YYYY-MM-DD HH:mm:ss"));
  }
  const handleChildValue = (value) => {
    setContent(value);
    const now = dayjs();
    setTime(now.format("YYYY-MM-DD HH:mm:ss"));
  }
  return (
    <form className="update" onSubmit={onSubmit}>
      <div className="update_header">
        <span className="announcement">공지사항</span>
        <textarea name="title" onChange={handleTitleValue} value={title}></textarea>
        <span className="time">{time}</span>
      </div>
      <Tinymce handleChildValue={(e) => handleChildValue(e)} content={content}/>
      <div className="update_buttons">
        <Link href={'/notice/'+id}>
          <button className="cancel_btn">취소</button>
        </Link>
        <button className="save_btn">저장</button>
      </div>
    </form>
  )
}