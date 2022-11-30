/*
  Copyright: (c) 2022, Justin Béra (@just1not2) <me@just1not2.org>
  MIT License (see LICENSE or https://mit-license.org)
*/

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getParticipants } from '../github.js';

chai.use(chaiAsPromised);

describe('Github Parsing tests', function() {
  it('Fail when a repository does not exist', async function() {
    const user = 'just1not2';
    const repository = 'fake-repository';
    const number = '1';

    await assert.isRejected(getParticipants(user, repository, number), Error, `the Github PR #${number} on the ${user}/${repository} repository could not be fetched (404 error)`);
  });

  it('Succeed in finding the correct number of participants', async function() {
    const user = 'Xilinx';
    const repository = 'llvm-project';
    const number = '2';
    const correctParticipants = '104';

    const parsedParticipants = await getParticipants(user, repository, number);
    assert.equal(parsedParticipants, correctParticipants);
  });
});
