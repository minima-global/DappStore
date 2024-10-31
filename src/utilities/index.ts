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

export const compareSemver = (v1: string | number, v2: string | number) => {
  const [major1, minor1, patch1] = String(v1).split('.').map(Number);
  const [major2, minor2, patch2] = String(v2).split('.').map(Number);

  if (major1 !== major2) {
    return major1 > major2 ? 1 : -1;
  }
  if (minor1 !== minor2) {
    return minor1 > minor2 ? 1 : -1;
  }
  if (patch1 !== patch2) {
    return patch1 > patch2 ? 1 : -1;
  }
  return false;
};

export default {};
