import findIndexById from "./findIndexById.js";

const updateGoalById = (id, goals, res) => {
  const goalToUpdateIndex = findIndexById(id, goals, res);
  goals[goalToUpdateIndex] = { id: parseInt(id), ...updatedGoalData };
  sendResponse(res, 200, `Goal with ${id} updated`, goals[goalToUpdateIndex]);
};

export default updateGoalById;
