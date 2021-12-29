import {useQuery} from 'react-query';
import {Octokit} from '@octokit/core';
import {Endpoints} from '@octokit/types';

type ReadmeResponse = Endpoints["GET /repos/{owner}/{repo}/readme"]["response"];

const octokit = new Octokit({ auth: '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'});

const getReadme = async (repo: string) => {
  const response: ReadmeResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/readme',
    {owner: 'barrymcandrews', repo}
  );

  return atob(response.data.content);
};

export default function useGitHubReadme(projectName: string) {
  return useQuery<string>(['readme', projectName], () => getReadme(projectName));
}
