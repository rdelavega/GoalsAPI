import sendResponse from "./sendResponse.js";

const findIndexById = (id, goals, res) => {
  const goalIndex = goals.findIndex((goal) => goal.id === parseInt(id));

  if (goalIndex === -1) {
    return sendResponse(res, 404, "Error", "Goal not found");
  }

  return goalIndex;
};

export default findIndexById;
