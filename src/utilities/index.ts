import {
  downloadFile,
  installMiniDapp, updateMiniDapp,
} from "../lib";

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
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

export default {}
