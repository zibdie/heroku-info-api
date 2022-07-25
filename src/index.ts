import fs from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();

import StackAPI from './apis/stack-api.js';

try {
  const herokuStackAPIPath = path.resolve(
    __dirname,
    'api',
    'heroku-stack-api.json'
  );

  await fs.writeFile(herokuStackAPIPath, JSON.stringify(await StackAPI()));
} catch (e) {
  console.error(`There was an error running the script: ${e}`);
  process.exit(1);
}
