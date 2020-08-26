import React from "react";
import { useParams, Redirect } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import page from '../posts/example-post.md';
import useFetch from 'use-http/dist';
import Error from './Error/Error';


interface BlogParams {
  postName: string
}

export default function Blog() {
  const params = useParams<BlogParams>();
  const { loading, error, data } = useFetch(page);
  console.log(JSON.stringify(page));
  return (
    <>
      {error && <Error/>}
      <ReactMarkdown source={data}/>
    </>
  );
}
