import sendResponse from "./sendResponse.js";

const filterGoals = (res, goals, param) => {
  if (typeof param !== "boolean") {
    return sendResponse(res, 409, "Error", "Param must be True or False");
  }
  const filteredGoals = goals.filter((goal) => goal.completed === param);

  if (filteredGoals.length === 0) {
    return sendResponse(res, 404, "Error", "Goals not found");
  }

  return filteredGoals;
};

export default filterGoals;
