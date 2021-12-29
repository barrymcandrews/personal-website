import {useQuery} from 'react-query';
import {Octokit} from '@octokit/core';
import {Endpoints} from '@octokit/types';
import {Base64} from 'js-base64';

type ReadmeResponse = Endpoints["GET /repos/{owner}/{repo}/readme"]["response"];

const octokit = new Octokit({ auth: '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'});

const getReadme = async (repo: string) => {
  const response: ReadmeResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/readme',
    {owner: 'barrymcandrews', repo}
  );

  return Base64.decode(response.data.content);
};

export default function useGitHubReadme(projectName: string) {
  return useQuery<string>(['readme', projectName], () => getReadme(projectName), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false
  });
}
