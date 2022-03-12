import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Error from '../Error/Error';
import { safeLoad } from 'js-yaml';
import { Navbar } from '../Navbar/Navbar';
import classes from './Blog.module.scss';

interface Metadata {
  title: string;
  date?: string;
}

interface BlogParams {
  postName: string;
}

export default function Blog() {
  const { postName } = useParams<BlogParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>();
  const [post, setPost] = useState<string>();

  useEffect(() => {
    import('./posts/' + postName + '.md')
      .then(postResponse => {
        fetch(postResponse.default).then(resp => {
          resp.text().then(postString => {
            const [, metaString, mdString] = postString.split('---', 3);
            setMetadata(safeLoad(metaString) as Metadata);
            setPost(mdString);
            setLoading(false);
          });
        });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [postName]);

  const Blockquote = (props: any) => {
    return (
      <div className={classes.blockquoteWrapper}>
        <blockquote>{props.children}</blockquote>
      </div>
    );
  };

  return (
    <>
      {error && <Error />}
      {loading && (
        <>
          <Navbar /> <div style={{ height: '100vh' }} />
        </>
      )}
      {post && (
        <div className={classes.Blog}>
          <Navbar />
          <div className={classes.container}>
            <div className='m-20'>
              <h1>{metadata!.title}</h1>
              <Markdown
                options={{
                  overrides: {
                    blockquote: {
                      component: Blockquote
                    }
                  }
                }}
              >
                {post}
              </Markdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
