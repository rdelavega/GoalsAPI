import findIndexByName from "./findIndexByName.js";
import sendResponse from "./sendResponse.js";

const updateGoalByName = async (res, goals, name, updatedGoalData) => {
  try {
    const goalToUpdateIndex = findIndexByName(res, goals, name);
    goals[goalToUpdateIndex] = { id: parseInt(id), ...updatedGoalData };
    return goals;
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
};

export default updateGoalByName;
