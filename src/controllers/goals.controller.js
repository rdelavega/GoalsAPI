// const { goals } = require("../data/goals.json");
const { json } = require("express");
const sendResponse = require("../utils/sendResponse");
const fs = require("fs");
const { readFile, writeFile } = require("fs/promises");
const readJson = require("../utils/readJson");
//Config
const filePath = "/home/rdlvg/Ejercicios/GoalsAPI/src/data/goals.json";

// TODO implement readJson and writeJson functions for separating and cleaning code
async function getGoals(req, res) {
  try {
    const goals = await readJson(filePath, res);
    sendResponse(res, 200, "Goals", goals);
  } catch (parseErr) {
    sendResponse(res, 500, "Error", parseErr);
  }
}

async function getGoalById(req, res, next) {
  const { id } = req.params;

  try {
    const goals = await readJson(filePath, res);
    const goalToFind = goals.find((goal) => goal.id === parseInt(id));

    if (!goalToFind) {
      return sendResponse(res, 404, "error", "Goal not found");
    }

    sendResponse(res, 200, `Goal ${id}`, goalToFind);
  } catch (err) {
    sendResponse(res, 500, "Error", err);
  }
}

async function getCompletedGoals(req, res) {
  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    if (!content) {
      sendResponse(res, 404, "Error", "Couldn't read file");
    }
    const goals = JSON.parse(content);
    const completedGoals = goals.filter((goal) => goal.completed === true);
    if (completedGoals.length === 0) {
      return sendResponse(res, 404, "error", "Completed goals not found");
    }
    sendResponse(res, 200, "Goals", completedGoals);
  } catch (err) {
    sendResponse(res, 500, "Error", err);
  }
}

async function getIncompletedGoals(req, res) {
  try {
    const content = readFile(filePath, { encoding: "utf8" });
    if (!content) {
      sendResponse(res, 404, "Error", "Couldn't read file");
    }
    const goals = JSON.parse(content);
    const incompletedGoals = goals.filter((goal) => goal.completed === false);
    if (incompletedGoals.length === 0) {
      return sendResponse(res, 404, "error", "Incompleted goals not found");
    }
    sendResponse(res, 200, "Goals", incompletedGoals);
  } catch (err) {
    sendResponse(res, 500, "Error", err);
  }
}

async function createGoal(req, res) {
  const goalData = req.body;

  if (!goalData) {
    return sendResponse(
      res,
      409,
      "Error",
      "There is no payload for creating a goal"
    );
  }
  if (
    !goalData.name |
    !goalData.start_date |
    !goalData.end_date |
    !goalData.completed
  ) {
    return sendResponse(
      res,
      409,
      "Error",
      "There is no data for creating goal"
    );
  }

  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    if (!content) {
      return sendResponse(res, 404, "Error", "Couldn't read file");
    }
    const goals = JSON.parse(content);
    const existingGoal = goals.find(
      (goal) => goal.id === parseInt(goalData.id)
    );
    if (existingGoal) {
      return sendResponse(
        res,
        409,
        "Error",
        "Theres an already existing goal with that id"
      );
    }

    goals.push(goalData);
    const goalsDataString = JSON.stringify(goals, null, 2);
    await writeFile(filePath, goalsDataString);
    sendResponse(res, 201, "Goal Created", goalData);
  } catch (err) {
    sendResponse(res, 500, "Error Creating Goal", err);
  }
}

async function validateGoalById(req, res) {
  const { id } = req.params;

  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    if (!content) {
      return sendResponse(res, 404, "Error", "Couldn't read file");
    }
    const goals = JSON.parse(content);
    const goalToCompleteIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );

    if (goalToCompleteIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals[goalToCompleteIndex].completed = true;

    const goalsDataString = JSON.stringify(goals, null, 2);

    await writeFile(filePath, goalsDataString);

    sendResponse(
      res,
      200,
      "Goal marked as completed",
      goals[goalToCompleteIndex]
    );
  } catch (err) {
    sendResponse(res, 500, "Error validating goal", err);
  }
}

async function invalidateGoalById(req, res) {
  const { id } = req.params;
  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    const goals = JSON.parse(content);
    const goalToIncompleteIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );

    if (goalToIncompleteIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals[goalToIncompleteIndex].completed = false;

    const goalsDataString = JSON.stringify(goals, null, 2);
    await writeFile(filePath, goalsDataString);

    sendResponse(
      res,
      200,
      "Goal marked as incompleted",
      goals[goalToIncompleteIndex]
    );
  } catch (err) {
    sendResponse(res, 500, "Error validating goal", err);
  }
}

async function updateGoal(req, res) {
  const { id } = req.params;
  const updatedGoalData = req.body;

  if (!updatedGoalData) {
    return sendResponse(res, 404, "Error", "There is no payload for update");
  }

  if (updatedGoalData.id) {
    return sendResponse(res, 409, "Error", "You can't update the goal ID.");
  }
  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    const goals = JSON.parse(content);
    const goalToUpdateIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );
    if (goalToUpdateIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals[goalToUpdateIndex] = { id: parseInt(id), ...updatedGoalData };

    const goalsDataString = JSON.stringify(goals, null, 2);
    await writeFile(filePath, goalsDataString);

    sendResponse(res, 200, `Goal with ${id} updated`, goals[goalToUpdateIndex]);
  } catch (err) {
    sendResponse(res, 500, "Error updating goal", err);
  }
}

async function deleteGoal(req, res) {
  const { id } = req.params;

  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    const goals = JSON.parse(content);
    const goalToDeleteIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );

    if (goalToDeleteIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals.splice(goalToDeleteIndex, 1);

    const goalsDataString = JSON.stringify(goals, null, 2);
    await writeFile(filePath, goalsDataString);

    sendResponse(
      res,
      200,
      `Goal with ID ${id} deleted. Goals remaining: ${goals.length}`,
      goals
    );
  } catch (err) {
    sendResponse(res, 500, "Error updating goal", err);
  }
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
