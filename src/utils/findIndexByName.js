import sendResponse from "./sendResponse.js";

const findIndexByName = (res, goals, name) => {
  try {
    const goalIndex = goals.findIndex((goal) => goal.name === name);

    return goalIndex;
  } catch (err) {
    sendResponse(res, 500, "findIndexByName Error", err.message);
  }
};

export default findIndexByName;
