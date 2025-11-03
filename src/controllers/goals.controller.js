// const { goals } = require("../data/goals.json");
const { json } = require("express");
const sendResponse = require("../utils/sendResponse");
const fs = require("fs");
const { readFile, writeFile } = require("fs/promises");
//Config
const filePath = "/home/rdelavega/CodingPractice/GoalsAPI/src/data/goals.json";

async function getGoals(req, res) {
  await readFile(filePath, "utf8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error", err);
    }
    try {
      const data = JSON.parse(jsonString);
      sendResponse(res, 200, "Goals", data);
      // You can now work with the 'data' object
    } catch (parseErr) {
      sendResponse(res, 500, "Error", parseErr);
    }
  });
}

async function getGoalById(req, res, next) {
  const { id } = req.params;

  const content = await readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error", err);
    }

    try {
      const goals = JSON.parse(jsonString);
      const goalToFind = goals.find((goal) => goal.id === parseInt(id));

      if (!goalToFind) {
        return sendResponse(res, 404, "error", "Goal not found");
      }

      sendResponse(res, 200, `Goal ${id}`, goalToFind);
    } catch (err) {
      sendResponse(res, 500, "Error", err);
    }
  });
}

async function getCompletedGoals(req, res) {
  const content = await readFile(filePath, "utf-8", (err) => {
    if (err) {
      return sendResponse(res, 500, "Error", err);
    }
    try {
      const goals = JSON.parse(content);
      const completedGoals = goals.filter((goal) => goal.completed === true);
      if (completedGoals.length === 0) {
        return sendResponse(res, 404, "error", "Completed goals not found");
      }
      sendResponse(res, 200, "Goals", completedGoals);
    } catch (err) {
      sendResponse(res, 500, "Error", err);
    }
  });
}

async function getIncompletedGoals(req, res) {
  await readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error", err);
    }
    try {
      const goals = JSON.parse(jsonString);
      console.log(goals);
      const incompletedGoals = goals.filter((goal) => goal.completed === false);
      if (incompletedGoals.length === 0) {
        return sendResponse(res, 404, "error", "Incompleted goals not found");
      }
      sendResponse(res, 200, "Goals", incompletedGoals);
    } catch (err) {
      sendResponse(res, 500, "Error", err);
    }
  });
}

function createGoal(req, res) {
  const goalData = req.body;

  if (!goalData) {
    return sendResponse(res, 404, "Error", "There is no payload for update");
  }
  fs.readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error reading file", err);
    }
    const goals = JSON.parse(jsonString);
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
    fs.writeFile(filePath, goalsDataString, (err) => {
      if (err) {
        return sendResponse(res, 500, "Error writing file", err);
      }

      sendResponse(res, 201, "Goal Created", goalData);
    });
  });
}

function validateGoalById(req, res) {
  const { id } = req.params;

  fs.readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error reading file", err);
    }
    const goals = JSON.parse(jsonString);
    const goalToCompleteIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );

    if (goalToCompleteIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals[goalToCompleteIndex].completed = true;

    const goalsDataString = JSON.stringify(goals, null, 2);

    fs.writeFile(filePath, goalsDataString, (err) => {
      if (err) {
        return sendResponse(res, 500, "Error writing file", err);
      }

      sendResponse(
        res,
        200,
        "Goal marked as completed",
        goals[goalToCompleteIndex]
      );
    });
  });
}

function invalidateGoalById(req, res) {
  const { id } = req.params;

  fs.readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error reading file", err);
    }
    const goals = JSON.parse(jsonString);
    const goalToIncompleteIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );

    if (goalToIncompleteIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals[goalToIncompleteIndex].completed = false;

    const goalsDataString = JSON.stringify(goals, null, 2);

    fs.writeFile(filePath, goalsDataString, (err) => {
      if (err) {
        return sendResponse(res, 500, "Error writing file", err);
      }

      sendResponse(
        res,
        200,
        "Goal marked as completed",
        goals[goalToIncompleteIndex]
      );
    });
  });
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
  fs.readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error reading file", err);
    }
    const goals = JSON.parse(jsonString);
    const goalToUpdateIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );
    if (goalToUpdateIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals[goalToUpdateIndex] = { id: parseInt(id), ...updatedGoalData };

    const goalsDataString = JSON.stringify(goals, null, 2);

    fs.writeFile(filePath, goalsDataString, (err) => {
      if (err) {
        return sendResponse(res, 500, "Error writing file", err);
      }

      sendResponse(
        res,
        200,
        `Goal with ${id} updated`,
        goals[goalToUpdateIndex]
      );
    });
  });
}

function deleteGoal(req, res) {
  const { id } = req.params;

  fs.readFile(filePath, "utf-8", (err, jsonString) => {
    if (err) {
      return sendResponse(res, 500, "Error reading file", err);
    }

    const goals = JSON.parse(jsonString);
    const goalToDeleteIndex = goals.findIndex(
      (goal) => goal.id === parseInt(id)
    );

    if (goalToDeleteIndex === -1) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }

    goals.splice(goalToDeleteIndex, 1);

    const goalsDataString = JSON.stringify(goals, null, 2);

    fs.writeFile(filePath, goalsDataString, (err) => {
      if (err) {
        return sendResponse(res, 500, "Error writing file", err);
      }

      sendResponse(
        res,
        200,
        `Goal with ID ${id} deleted. Goals remaining: ${goals.length}`,
        goals
      );
    });
  });
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
