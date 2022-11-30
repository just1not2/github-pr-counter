/*
  Entrypoint of the Github PR Counter
  Copyright: (c) 2022, Justin Béra (@just1not2) <me@just1not2.org>
  MIT License (see LICENSE or https://mit-license.org)
*/

import { getConfiguration } from './config.js';
import { getParticipants } from './github.js';

const config = getConfiguration();
const numberOfParticipants = await getParticipants(config.user, config.repository, config.number);
console.log(`Number of participants on PR #${config.number} on the ${config.user}/${config.repository} repository: ${numberOfParticipants}`);
