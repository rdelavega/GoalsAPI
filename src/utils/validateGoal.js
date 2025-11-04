import findIndexById from "./findIndexById.js";
import sendResponse from "./sendResponse.js";

const validateGoal = (id, goals, param, res) => {
  if (typeof param !== Boolean) {
    return sendResponse(res, 409, "Error", "Param must be True or False");
  }

  const goalToValidateIndex = findIndexById(id, goals, res);

  goals[goalToValidateIndex].completed = param;
  let message = param === true ? "completed" : "incompleted";
  sendResponse(
    res,
    200,
    `Goal marked as ${message}`,
    goals[goalToCompleteIndex]
  );
};

export default validateGoal;
