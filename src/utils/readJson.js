import { readFile } from "fs/promises";
import sendResponse from "./sendResponse.js";

async function readJson(filePath, res) {
  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    if (!content) {
      return sendResponse(res, 404, "Error", "Couldn't read file");
    }
    const goals = JSON.parse(content);
    return goals;
  } catch (err) {
    sendResponse(res, 500, "readJson error", err);
  }
}

export default readJson;
