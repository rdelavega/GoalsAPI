import sendResponse from "../utils/sendResponse.js";

export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  sendResponse(res, 500, err.message || "Internal Server Error", err.stack);
}
