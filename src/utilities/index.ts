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

export default {}
