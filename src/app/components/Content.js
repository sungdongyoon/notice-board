"use client"

// import { useParams } from 'next/navigation';
import React from 'react';
import { useRef, useEffect } from 'react';

const Content = ({ result }) => {
  // const params = useParams();
  // const id = params.id;
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.innerHTML = result.content
    }, [])
  return (
    <div className="notice_content" ref={contentRef}>
    </div>
  )
}

export default Content;
