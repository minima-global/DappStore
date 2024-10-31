import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const dirName = path.dirname(__filename);

export default dirName;
