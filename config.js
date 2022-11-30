/*
  Configuration of the Github PR Counter
  Copyright: (c) 2022, Justin Béra (@just1not2) <me@just1not2.org>
  MIT License (see LICENSE or https://mit-license.org)
*/

/**
 * Get the value of an environment variable.
 *
 * @param {string} key The environment variable.
 * @param {(string) => boolean} validationValue The function that validates an environment variable value.
 * @return {string} The value associated to the variable.
 */
function getConfigurationKey(key, validateValue) {
  if (typeof key === 'undefined') {
    throw new Error(`input key "${key}" was not declared`);
  }
  validateValue(process.env[key]);
  return process.env[key];
}

/**
 * Get the configuration of the Github PR Counter.
 *
 * @return {{ user: string, repository: string, number: string }} The dictionary that contains the 3 Github PR Counter configuration values.
 */
export function getConfiguration() {
  const user = getConfigurationKey('GITHUB_USER', (value) => {
    // Username may only contain alphanumeric characters or hyphens
    const usernameRegex = /^[a-zA-Z\d-]+$/;
    if (value.match(usernameRegex) === null) {
      throw new Error(`"${value}" could not be interpreted as a valid Github username`);
    }
  });

  const repository = getConfigurationKey('GITHUB_REPOSITORY', (value) => {
    // Repositories may only contain alphanumeric characters, dashes or hyphens
    const repositoryRegex = /^[a-zA-Z\d-_]+$/;
    if (value.match(repositoryRegex) === null) {
      throw new Error(`"${value}" could not be interpreted as a valid Github repository`);
    }
  });

  const number = getConfigurationKey('GITHUB_PR_NUMBER', (value) => {
    const numberValue = parseFloat(value);
    if (isNaN(numberValue) || !Number.isInteger(numberValue) || numberValue < 1) {
      throw new Error(`"${value}" could not be interpreted as a valid PR number`);
    }
  });

  return { user, repository, number };
}