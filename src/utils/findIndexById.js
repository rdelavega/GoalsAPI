import sendResponse from "./sendResponse.js";

const findIndexById = (id, goals, res) => {
  try {
    const goalIndex = goals.findIndex((goal) => goal.id === parseInt(id));

    if (goalIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    return goalIndex;
  } catch (err) {
    sendResponse(res, 500, "findIndexById Error", JSON.parse(err));
  }
};

export default findIndexById;
