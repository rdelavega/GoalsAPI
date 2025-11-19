import sendResponse from "./sendResponse.js";

const findIndexById = (res, goals, id) => {
  try {
    const goalIndex = goals.findIndex((goal) => goal.id === id);

    return goalIndex;
  } catch (err) {
    sendResponse(res, 500, "findIndexById Error", err.message);
  }
};

export default findIndexById;
