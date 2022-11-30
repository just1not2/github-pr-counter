# GITHUB PR COUNTER

A NodeJS script that fetches the number of participants in a Github pull request.

**Warning: as this script uses web scraping on an undocumented page to get the required information, it may break on any Github frontend updates.**


## Installion of dependencies

To install dev and production dependencies, just launch the following command:

```bash
npm install
```


## Configuration

To configure the Github PR Counter, copy the env file template with:

```bash
npm run template
```

Then, the following configuration environment variables should be filled:
* `GITHUB_USER`: owner of the repository of the PR
* `GITHUB_REPOSITORY`: name of the repository of the PR
* `GITHUB_PR_NUMBER`: number of the PR in the repository


## Launching the script

To start the Github PR Counter, just launch the following command:

```bash
npm run start
```


## Tests

Two testing suites have been configured to test the script with Mocha. Try it out with:

```bash
npm run test
```


## See Also

* [Github API documentation about pull requests](https://docs.github.com/en/rest/pulls/pulls#get-a-pull-request)
* [Mocha documentation](https://mochajs.org)


## Licensing

MIT License.

See [LICENSE](./LICENSE) to see the full text.


## Author Information

This script was created in 2022 by Justin Béra.
