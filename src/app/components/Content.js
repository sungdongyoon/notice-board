"use client"

import React from 'react';
import { useRef, useEffect } from 'react';

const Content = ({ result }) => {
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
