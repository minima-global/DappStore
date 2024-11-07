import { downloadFile, installMiniDapp, updateMiniDapp } from '../lib';

export async function downloadAndInstallMDSFile(url: string, trust: 'write' | 'read' = 'read') {
  const downloadedFile = await downloadFile(url);
  await installMiniDapp(downloadedFile.download.path, trust);
}

export async function downloadAndUpdateMDSFile(url: string, uid: string, trust: 'write' | 'read' = 'read') {
  const downloadedFile = await downloadFile(url);
  await updateMiniDapp(downloadedFile.download.path, uid, trust);
}

export function toHex(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const hex = str.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result.toUpperCase();
}

export function compareSemver(v1, v2) {
  const [major1 = 0, minor1 = 0, patch1 = 0] = String(v1).split('.').map(Number);
  const [major2 = 0, minor2 = 0, patch2 = 0] = String(v2).split('.').map(Number);

  if (major1 !== major2) {
    return major1 > major2 ? false : true;
  }
  if (minor1 !== minor2) {
    return minor1 > minor2 ? false : true;
  }
  if (patch1 !== patch2) {
    return patch1 > patch2 ? false : true;
  }

  return false;
}

export default {};
