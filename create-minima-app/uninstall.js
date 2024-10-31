import axios from "axios";
import { miniDappName } from "./get-package-info.js";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function uninstall() {
  const installedApps = await axios.get(`http://localhost:9005/mds`);
  const foundInstallations = installedApps.data.response.minidapps.filter(
    (i) => i.conf.name === capitalize(miniDappName),
  );
  const foundInstallationUIDS = foundInstallations.map((i) => i.uid);

  for (let uid of foundInstallationUIDS) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await axios.get(
      `http://localhost:9005/mds ${encodeURIComponent(`action:uninstall uid:`)}${uid}`,
    );
    console.log(`Successfully uninstalled minidapp uid:${uid}`);
  }

  return true;
}
