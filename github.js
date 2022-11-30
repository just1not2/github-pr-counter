/*
  Github Parser of the Github PR Counter
  Copyright: (c) 2022, Justin Béra (@just1not2) <me@just1not2.org>
  MIT License (see LICENSE or https://mit-license.org)
*/

import { parse } from 'node-html-parser';

/**
 * Verify that a PR on a Github repository is valid.
 *
 * @async
 * @param {string} user The owner of the Github repository.
 * @param {string} repository The name of the repository.
 * @param {string} number The PR number.
 * @return {Promise<void>} Void.
 */
async function validateGithubPullRequest(user, repository, number) {
  const res = await fetch(`https://api.github.com/repos/${user}/${repository}/pulls/${number}`);
  if (res.status !== 200) {
    throw new Error(`the Github PR #${number} on the ${user}/${repository} repository could not be fetched (${res.status} error)`);
  }
}

/**
 * Get the URL of a PR on a Github repository.
 *
 * @param {string} user The owner of the Github repository.
 * @param {string} repository The name of the repository.
 * @param {string} number The PR number.
 * @return {string} The URL of the PR.
 */
function getGithubPullRequestURL(user, repository, number) {
  return `https://github.com/${user}/${repository}/pull/${number}`;
}

/**
 * Fetch the HTML of a PR page on a Github repository.
 *
 * @async
 * @param {string} user The owner of the Github repository.
 * @param {string} repository The name of the repository.
 * @param {string} number The PR number.
 * @return {Promise<{ htmlText: string, githubPullRequestURL: string }>} The dictionary that contains the HTML of the PR page and the URL of the PR.
 */
async function fetchGithubPullRequestHTML(user, repository, number) {
  const githubPullRequestURL = getGithubPullRequestURL(user, repository, number);
  try {
    const html = await fetch(githubPullRequestURL);
    const htmlText = await html.text();
    return { htmlText, githubPullRequestURL };
  } catch (error) {
    throw new Error(`cannot fetch Github PR HTML page: ${error}`);
  }
}

/**
 * Get the parsed HTML of a PR page on a Github repository.
 *
 * @async
 * @param {string} user The owner of the Github repository.
 * @param {string} repository The name of the repository.
 * @param {string} number The PR number.
 * @return {Promise<any>} The parsed HTML of the PR.
 */
async function parseGithubPullRequestPage(user, repository, number) {
  const html = await fetchGithubPullRequestHTML(user, repository, number);
  try {
    return parse(html.htmlText);
  } catch (error) {
    throw new Error(`cannot parse Github PR page at "${html.githubPullRequestURL}": ${error}`);
  }
}

/**
 * Get the number of participants of a PR on a Github repository.
 *
 * @async
 * @param {string} user The owner of the Github repository.
 * @param {string} repository The name of the repository.
 * @param {string} number The PR number.
 * @return {Promise<string>} The number of participants of the PR.
 */
export async function getParticipants(user, repository, number) {
  await validateGithubPullRequest(user, repository, number);
  const parsedHtml = await parseGithubPullRequestPage(user, repository, number);
  const div = parsedHtml.querySelector('div#partial-users-participants div.participation div.discussion-sidebar-heading');

  if (div === null || div.childNodes.length < 1 || div.childNodes[0].rawText === null) {
    throw new Error('cannot parse participant string in Github Pull Request HTML page');
  }
  const participantString = div.childNodes[0].rawText;

  const participantMatch = participantString.match(/ (\d+) participant/);
  if (participantMatch === null) {
    throw new Error('cannot parse number of participants in participant string');
  }

  return participantMatch[1];
}
