const { goals } = require("../data/goals.json");
const sendResponse = require("../utils/sendResponse");

function getGoals(req, res) {
  if (goals.length === 0) {
    return sendResponse(res, 404, "error", "No goals were found");
  }
  sendResponse(res, 200, `Total goals: ${goals.length}`, goals);
}

function getGoalById(req, res) {
  const { id } = req.params;
  const goalToFind = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToFind) {
    return sendResponse(res, 404, "error", "Goal not found");
  }

  sendResponse(res, 200, `Goal ${id}`, goalToFind);
}

function getCompletedGoals(req, res) {
  const completed = goals.filter((goal) => goal.completed === true);

  if (completed.length === 0) {
    return sendResponse(res, 404, "error", "Incompleted goals not found");
  }

  sendResponse(res, 200, `Goals completed`, completed);
}

function getIncompletedGoals(req, res) {
  const incompleted = goals.filter((goal) => goal.completed === false);

  if (incompleted.length === 0) {
    return sendResponse(res, 404, "error", "incompleted goals not found");
  }

  sendResponse(res, 200, `Goals incompleted`, incompleted);
}

function createGoal(req, res) {
  const { id, name, start_date, end_date, completed } = req.body;
  const findExistingGoal = goals.find((goal) => goal.id === parseInt(id));

  if (findExistingGoal) {
    return sendResponse(
      res,
      409,
      "Error",
      "Theres an already existing goal with that id"
    );
  }

  goals.push({ id, name, start_date, end_date, completed });
  sendResponse(res, 201, "Goal Created", goals);
}

function validateGoalById(req, res) {
  const { id } = req.params;
  const goalToComplete = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToComplete) {
    return sendResponse(res, 404, "Error", "Goal not found");
  }

  goalToComplete.completed = true;

  sendResponse(res, 200, "Goal marked as completed", goalToComplete);
}

function invalidateGoalById(req, res) {
  const { id } = req.params;

  const goalToIncomplete = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToIncomplete) {
    return sendResponse(res, 404, "Error", "Goal not found");
  }

  goalToIncomplete.completed = false;
  sendResponse(res, 200, "Goal marked as incomplete", goalToIncomplete);
}

function updateGoal(req, res) {
  const { id } = req.params;
  const updatedGoalData = req.body;

  if (!updatedGoalData) {
    return sendResponse(res, 404, "Error", "There is no payload for update");
  }

  if (updatedGoalData.id) {
    return sendResponse(res, 409, "Error", "You can't updated goal ID");
  }

  const goalToUpdateIndex = goals.findIndex((goal) => goal.id === parseInt(id));

  if (goalToUpdateIndex !== -1) {
    goals[goalToUpdateIndex] = { id: id, ...updatedGoalData };
    return sendResponse(res, 200, "Updated", goals[goalToUpdateIndex]);
  } else {
    sendResponse(res, 404, "Error", "Goal not found");
  }
}

function deleteGoal(req, res) {
  const { id } = req.params;
  const indexGoalToDelete = goals.findIndex((goal) => goal.id === parseInt(id));

  if (indexGoalToDelete === -1) {
    return sendResponse(res, 404, "Error", "Goal not found");
  }

  goals.splice(indexGoalToDelete, 1);

  sendResponse(
    res,
    200,
    `Deleted Goal with ID: ${id}, Goals remaining: ${goals.length}`,
    goals
  );
}

module.exports = {
  getGoals,
  getGoalById,
  getCompletedGoals,
  getIncompletedGoals,
  createGoal,
  validateGoalById,
  invalidateGoalById,
  updateGoal,
  deleteGoal,
};
