import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

import StackAPI from './apis/stack-api.js';

try {
  const herokuStackAPIPath = path.resolve(
    __dirname,
    'api',
    'heroku-stack-api.json'
  );

  if (!fs.existsSync(path.resolve(__dirname, 'api'))) {
    fs.mkdirSync(path.resolve(__dirname, 'api'), { recursive: true });
  }
  await fs.writeFileSync(herokuStackAPIPath, JSON.stringify(await StackAPI()));
} catch (e) {
  throw `There was an error running the script: ${e}`;
}
