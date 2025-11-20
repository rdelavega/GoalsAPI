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
    !req.body.goal_name |
      !req.body.goal_category |
      !req.body.start_date |
      !req.body.end_date |
      (typeof req.body.complete !== "boolean")
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
