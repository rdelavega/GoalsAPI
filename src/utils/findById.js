import sendResponse from "./sendResponse.js";

function findById(goals, id, res) {
  const goalToFind = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToFind) {
    return sendResponse(404, "Error", "Error finding goal");
  }

  return goalToFind;
}

export default findById;
