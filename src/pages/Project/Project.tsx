import React from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Error from '../../components/Error/Error';
import { Navbar } from '../../components/Navbar/Navbar';
import classes from './Project.module.scss';
import useGitHubProject from '../../hooks/useGitHubProject';
import useGitHubReadme from '../../hooks/useGitHubReadme';
import { QueryClient, QueryClientProvider } from 'react-query';

interface ProjectParams {
  projectName: string;
}

const queryClient = new QueryClient();

function ProjectPage() {
  const { projectName } = useParams<ProjectParams>();

  const { isLoading, error, data: projectData } = useGitHubProject(projectName);
  const { data: readme } = useGitHubReadme(projectName);

  const Blockquote = (props: any) => {
    return (
      <div className={classes.blockquoteWrapper}>
        <blockquote>{props.children}</blockquote>
      </div>
    );
  };

  const GitHubImage = (props: any) => {
    return (
      <img
        alt={props?.alt}
        height={props?.height}
        src={`${projectData?.html_url}/raw/master/${props.src}`}
      />
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      {error && <Error />}
      {isLoading && (
        <>
          <Navbar /> <div style={{ height: '100vh' }} />
        </>
      )}
      {projectData && (
        <div className={classes.Project}>
          <Navbar />
          <div className={classes.container}>
            <div className='m-20'>
              <div className={classes.codeHint}>$ git clone {projectData.clone_url}</div>
              {readme && (
                <Markdown
                  className={classes.markdown}
                  options={{
                    overrides: {
                      blockquote: Blockquote,
                      img: GitHubImage
                    },
                    namedCodesToUnicode: {
                      bull: '\u2022'
                    }
                  }}
                >
                  {readme}
                </Markdown>
              )}
            </div>
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}

export default function Project() {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <ProjectPage />
    </QueryClientProvider>
  );
}
