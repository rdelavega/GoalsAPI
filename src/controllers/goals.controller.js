const { goals } = require("../data/goals.json");
const fs = require("fs");

function getGoals(req, res) {
  if (goals.length === 0) {
    return res.status(404).send("No Goals added in db");
  }
  res.status(200).json(goals);
}

function getGoalById(req, res) {
  const { id } = req.params;
  goalToFind = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToFind) {
    return res.status(404).send("Goal not found, Es el de id");
  }

  res.status(200).json(goalToFind);
}

function getCompletedGoals(req, res) {
  const completed = goals.filter((goal) => goal.completed === true);

  if (completed.length === 0) {
    return res.status(404).send("Error 404. Completed Goals not found");
  }

  res.status(200).json(completed);
}

function getIncompletedGoals(req, res) {
  const incompleted = goals.filter((goal) => goal.completed === false);

  if (incompleted.length === 0) {
    return res.status(404).send("Error 404. Incompleted Goals not found");
  }

  res.status(200).json(incompleted);
}

function createGoal(req, res) {
  const findExistingGoal = goals.find((goal) => goal.id === parseInt(id));

  if (findExistingGoal) {
    return res.status(400).send("Attempting to create goal with same id");
  }

  goals.push({ id, name, start_date, end_date, completed });
  res.status(201).send("Created goal with ID", id);
}

function validateGoalById(req, res) {
  const goalToComplete = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToComplete) {
    return res.status(404).send("Goal not found");
  }

  goalToComplete.completed = true;

  res.status(200).send(`Goal with ID ${id} completed`);
}

function invalidateGoalById(req, res) {
  const { id } = req.params;

  const goalToIncomplete = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToIncomplete) {
    return res.status(404).send("Goal not found");
  }

  goalToIncomplete.completed = false;
  res.status(200)(`Goal with ID ${id} marked as incompleted`);
}

function updateGoal(req, res) {
  const { id } = req.params;
  const updatedGoalData = req.body;

  const goalToUpdateIndex = goals.findIndex((goal) => goal.id === parseInt(id));

  if (goalToUpdateIndex !== -1) {
    goals[goalToUpdateIndex] = { id: id, ...updatedGoalData };
    return res.status(200).json(goals[goalToUpdateIndex]);
  } else {
    return res.status(404).json({ message: "Goal not found" });
  }
}

function deleteGoal(req, res) {
  const { id } = req.params;
  const indexGoalToDelete = goals.findIndex((goal) => goal.id === parseInt(id));

  if (!indexGoalToDelete) {
    return res.status(404).send("Goal not found");
  }

  delete goals[indexGoalToDelete];

  res.send(`Deleted Goal with ID: ${id}, Goals remaining: ${goals}`);
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
