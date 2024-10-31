import path from "path";
import axios from "axios";
import dirName from "./get-dir-name.js";
import { miniDappName, miniDappVersion } from "./get-package-info.js";

const pathToFile = path.join(dirName, "..");

export async function install() {
  return axios
    .get(
      `http://localhost:9005/${encodeURIComponent(`mds action:install file:${pathToFile}/${miniDappName}-${miniDappVersion}.mds.zip`)}`,
    )
    .then((data) => console.log(data));
}
