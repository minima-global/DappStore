import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonAsString = fs.readFileSync(
  __dirname + "/../package.json",
  "utf-8",
);
const packageJson = JSON.parse(packageJsonAsString);
export const fileName = `${packageJson.name}-${packageJson.version}.mds.zip`;
export const miniDappName = packageJson.name;
export const miniDappVersion = packageJson.version;
