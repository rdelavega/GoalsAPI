import findIndexById from "./findIndexById.js";
import sendResponse from "./sendResponse.js";

const validateGoal = async (res, id, goals, param) => {
  try {
    if (typeof param !== "boolean") {
      console.log(
        `[validateGoal]: Error, param is not boolean is ${typeof param}`
      );
      return sendResponse(res, 409, "Error", "Param must be True or False");
    }

    const goalToValidateIndex = findIndexById(id, goals, res);

    goals[goalToValidateIndex].completed = param;
    let message = param === true ? "completed" : "incompleted";

    console.log(`Goal with id: ${id}, marked as ${param}`);
    sendResponse(
      res,
      200,
      `Goal marked as ${message}`,
      goals[goalToValidateIndex]
    );

    return goals;
  } catch (err) {
    console.log(`[validateGoal]: Error, ${err}`);
  }
};

export default validateGoal;
