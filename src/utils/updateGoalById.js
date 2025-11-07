import findIndexById from "./findIndexById.js";
import sendResponse from "./sendResponse.js";

const updateGoalById = async (res, id, goals, updatedGoalData) => {
  try {
    const goalToUpdateIndex = findIndexById(res, id, goals);
    goals[goalToUpdateIndex] = { id: parseInt(id), ...updatedGoalData };
    return goals;
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
};

export default updateGoalById;
