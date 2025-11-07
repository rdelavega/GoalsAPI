import sendResponse from "../utils/sendResponse.js";

export default function validatePutRoute(req, res, next) {
  console.log("Running Validation...");
  if (req.method === "PUT" && req.body.id) {
    return sendResponse(res, 409, "Error", "You can't update goal ID");
  }
  if (
    req.method === "PUT" &&
    !req.body.name |
      !req.body.start_date |
      !req.body.end_date |
      (typeof req.body.completed !== "boolean")
  ) {
    return sendResponse(
      res,
      409,
      "Error",
      "Missing required data for updating goal"
    );
  }

  console.log("Validation complete");
  next();
}
