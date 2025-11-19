import { isDate } from "util/types";
import sendResponse from "../utils/sendResponse.js";

export default function validateRoute(req, res, next) {
  console.log("Running validation...");

  if (!req.params) {
    return sendResponse(res, 409, "Error", "No id param");
  }

  if (req.method === "POST" && !req.body) {
    return sendResponse(res, 409, "Error", "There is no payload");
  }

  if (
    req.method === "POST" &&
    !req.body.goalData.name |
      !req.body.goalData.start_date |
      !req.body.goalData.end_date |
      (typeof req.body.goalData.completed !== "boolean")
  ) {
    return sendResponse(
      res,
      409,
      "Error",
      "Missing required data for creating goal"
    );
  }

  console.log("Validation Completed");

  next();
}
