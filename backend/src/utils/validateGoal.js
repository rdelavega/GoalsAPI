import findIndexByName from "./findIndexByName.js";
import sendResponse from "./sendResponse.js";

const validateGoal = async (res, name, goals, param) => {
  try {
    console.log("Value of param in validateGoal: ", param);
    if (typeof param !== "boolean") {
      return sendResponse(res, 409, "Error", "Param must be True or False");
    }

    let message = param === true ? "completed" : "incompleted";

    const goalToValidateIndex = findIndexByName(res, goals, name);

    if (!goalToValidateIndex) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    //! Broken
    // if (goals[goalToValidateIndex].completed === param) {
    //   return sendResponse(
    //     res,
    //     304,
    //     "Not modified",
    //     `Goal already in ${message} status`
    //   );
    // }

    goals[goalToValidateIndex].completed = param;

    return goals;
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
};

export default validateGoal;
