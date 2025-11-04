export default function sendResponse(res, status, message, data) {
  res.status(status).json({ status: status, message: message, data: data });
}
