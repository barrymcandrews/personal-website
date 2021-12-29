import {useQuery} from 'react-query';
import {Octokit} from '@octokit/core';
import {Endpoints} from '@octokit/types';

type ProjectResponse = Endpoints["GET /repos/{owner}/{repo}"]["response"];

const octokit = new Octokit({ auth: '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'});

const getProject = async (repo: string) => {
  const response: ProjectResponse = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'barrymcandrews',
    repo
  });
  return response.data;
};

export default function useGitHubProject(projectName: string) {
  return useQuery(['projects', projectName], () => getProject(projectName));
}
