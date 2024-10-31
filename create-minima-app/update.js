import axios from 'axios';
import http from 'http';
import path from 'path';
import dirName from './get-dir-name.js';
import { miniDappName, fileName } from './get-package-info.js';

const httpAgent = new http.Agent({ keepAlive: true });

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pathToFile = path.join(dirName, '..');

export async function update() {
  const installedApps = await axios(`http://localhost:6005/mds`);
  const foundInstallations = installedApps.data.response.minidapps.filter(
    (i) =>
      i.conf.name ==
      miniDappName
        .split('_')
        .map((i) => capitalize(i))
        .join(' ')
  );
  const foundInstallationUIDS = foundInstallations.map((i) => i.uid);

  for (let uid of foundInstallationUIDS) {
    const filePath = encodeURIComponent(`file: ${pathToFile}/${fileName}`);
    await axios
      .get(`http://localhost:6005/mds%20action:update%20uid:${uid}%20${filePath}`, {
        httpAgent,
      })
      .then(() => console.log(`Updated ${uid} - ${miniDappName.name}`))
      .catch((e) => console.log(e, `An error occurred whilst updating`));
  }
}
