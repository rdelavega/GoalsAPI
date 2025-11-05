import findIndexById from "./findIndexById.js";
import sendResponse from "./sendResponse.js";

const updateGoalById = async (id, goals, updatedGoalData, res) => {
  try {
    const goalToUpdateIndex = findIndexById(id, goals, res);
    goals[goalToUpdateIndex] = { id: parseInt(id), ...updatedGoalData };
    return goals;
  } catch (err) {
    console.log(`[updateGoalById]: Error ${err}`);
  }
};

export default updateGoalById;
