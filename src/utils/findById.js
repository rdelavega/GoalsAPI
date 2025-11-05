import sendResponse from "./sendResponse.js";

function findById(goals, id, res) {
  const goalToFind = goals.find((goal) => goal.id === parseInt(id));

  return goalToFind;
}

export default findById;
