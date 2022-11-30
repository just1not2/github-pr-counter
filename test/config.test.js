/*
  Copyright: (c) 2022, Justin Béra (@just1not2) <me@just1not2.org>
  MIT License (see LICENSE or https://mit-license.org)
*/

import { assert } from 'chai';
import { getConfiguration } from '../config.js';

describe('Configuration tests', function() {
  it('Fail when a configuration key is not set', function() {
    process.env.GITHUB_USER = 'just1not2';
    process.env.GITHUB_PR_NUMBER = '1';
    assert.throws(getConfiguration, Error, 'input key "GITHUB_REPOSITORY" was not declared');
  });

  it('Fail when the PR number is not an valid number', function() {
    process.env.GITHUB_USER = 'just1not2';
    process.env.GITHUB_REPOSITORY = 'ansible-collection-pm2';
    process.env.GITHUB_PR_NUMBER = 'NaN';
    assert.throws(getConfiguration, Error, `"${process.env.GITHUB_PR_NUMBER}" could not be interpreted as a valid PR number`);
  });

  it('Succeed when the configuration is valid', function() {
    process.env.GITHUB_USER = 'just1not2';
    process.env.GITHUB_REPOSITORY = 'ansible-collection-pm2';
    process.env.GITHUB_PR_NUMBER = '1';
    assert.deepEqual(getConfiguration(), { user: 'just1not2', repository: 'ansible-collection-pm2', number: '1' });
  });
});
