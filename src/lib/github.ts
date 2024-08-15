import { Octokit } from '@octokit/core';
import { TUserConfig } from './spiffy/user_config_spf';

export function  getOctokit(userConfig: TUserConfig): Octokit {
  const auth = userConfig.getFPAuthToken();
  if (!auth) {
    throw new Error(
      'No freephite auth token found. Run `fp auth-fp -t <YOUR_GITHUB_TOKEN>` then try again.'
    );
  }
  const githubBaseUrl = userConfig.getGithubBaseUrl();

  let octokit_args = {};
  if (githubBaseUrl) {
    octokit_args = { auth, baseUrl: githubBaseUrl };
  } else {
    octokit_args = { auth };
  }
  return new Octokit(octokit_args);
}
