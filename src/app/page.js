"use client"

import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Pagination from "react-js-pagination";
import Link from "next/link";
import dayjs from "dayjs";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:9999/notices/', {cache: "no-store"})
      .then(response => response.json())
      .then(result => {``
        setData([...result].reverse());
        setLoading(false);
      })
  }, [])
  
  const [page, setPage] = useState(1);
  const [currentPost, setCurrentPost] = useState([]);
  const postPerPage = 10;
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [result, setResult] = useState([]);
  const filteredData = data.filter((it) => it.title.toLowerCase().includes(result));

  const handleSearch = (e) => {
    setResult(e.target.value.toLowerCase());
  };

  useEffect(() => {
    setCurrentPost(data.slice(indexOfFirstPost, indexOfLastPost));
  }, [data, page])
  
  useEffect(() => {
    setCurrentPost(filteredData.slice(indexOfFirstPost, indexOfLastPost));
  }, [result, page]);
  
  const now = dayjs();
  return (
    <div className="main">
      <div className="main_header">
        <h1>공지사항</h1>
        <div className="main_input">
          <input onChange={(e) => handleSearch(e)} type="text" placeholder="검색어" value={result}/>
          {result.length === 0 ?
            <span className="input_icon">🔍</span> :
            <span onClick={() => setResult("")} className="input_icon">❌</span>
          }
        </div>
      </div>
      <div className='notice_list'>
        {!loading ? 
          currentPost.length === 0 ?
            <span className="notice_notification">공지사항이 없습니다.</span> :
              currentPost.map((el) => (
              <Link className="notice_list_wrap" href={`/notice/${el.id}`} key={el.id}>
                <span className="notice_list_title">{el.title}</span>
                <span className="notice_list_time">{
                  now.diff(dayjs(el.time), "s") < 59 ? "방금 전" :
                  now.diff(dayjs(el.time), "m") >= 1 && now.diff(dayjs(el.time), "m") <= 59 ? `${now.diff(dayjs(el.time), "m")}분 전` :
                  now.diff(dayjs(el.time), "h") >= 1 && now.diff(dayjs(el.time), "h") <= 23 ? `${now.diff(dayjs(el.time), "h")}시간 전` : 
                  now.diff(dayjs(el.time), "DD") >= 1 ? el.time : ""
                }</span>
              </Link>
            ))
            :
          <Loading/>
        }
      </div>
      <div className="page_select">
        {currentPost.length !== 0 &&
          <Pagination
            activePage={page}
            itemsCountPerPage={postPerPage}
            totalItemsCount={filteredData.length}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        }
      </div>
    </div>
  )
}


export default Page;
