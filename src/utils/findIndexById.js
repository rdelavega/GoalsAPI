import sendResponse from "./sendResponse.js";

const findIndexById = (res, id, goals) => {
  try {
    const goalIndex = goals.findIndex((goal) => goal.id === parseInt(id));

    return goalIndex;
  } catch (err) {
    sendResponse(res, 500, "findIndexById Error", err.message);
  }
};

export default findIndexById;
