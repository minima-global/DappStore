import fs from "fs";
import archiver from "archiver";
import dirName from "./get-dir-name.js";
import { fileName } from "./get-package-info.js";

export async function zip() {
  return new Promise((resolve) => {
    const output = fs.createWriteStream(`${dirName}/../${fileName}`);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    archive.directory(`${dirName}/../build/`, false);
    archive.pipe(output);
    archive.finalize();
    archive.on("end", function () {
      resolve(true);
    });
  });
}
