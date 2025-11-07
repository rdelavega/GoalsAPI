import sendResponse from "../utils/sendResponse.js";
import readJson from "../utils/readJson.js";
import writeJson from "../utils/writeJson.js";
import findById from "../utils/findById.js";
import filterGoals from "../utils/filterGoals.js";
import validateGoal from "../utils/validateGoal.js";
import updateGoalById from "../utils/updateGoalById.js";
import findIndexById from "../utils/findIndexById.js";
//Config
const filePath = "/home/rdelavega/CodingPractice/GoalsAPI/src/data/goals.json";

// TODO check consistencies on success and error messages, as in function names and params
async function getGoals(req, res) {
  try {
    const goals = await readJson(res, filePath);
    sendResponse(res, 200, "Success", goals);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function getGoalById(req, res) {
  const { id } = req.params;

  try {
    const goals = await readJson(res, filePath);
    const goalToFind = findById(res, goals, id);
    if (!goalToFind) {
      return sendResponse(res, 404, "Error", "Goal not found");
    }
    return sendResponse(res, 200, "Success", goalToFind);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function getGoalsByStatus(req, res) {
  const searchStatus = req.query.q;
  const statusValue = searchStatus === "complete" ? true : false;
  try {
    const goals = await readJson(res, filePath);
    const goalsByStatus = filterGoals(res, goals, statusValue);
    sendResponse(res, 200, "Success", goalsByStatus);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function createGoal(req, res) {
  const goalData = req.body;

  try {
    const goals = await readJson(res, filePath);
    const existingGoal = findById(res, goals, goalData.id);
    if (existingGoal) {
      return sendResponse(
        res,
        409,
        "Error",
        "There's an already existing goal with that id"
      );
    }

    goals.push(goalData);
    const result = await writeJson(res, filePath, goals);
    sendResponse(res, 201, "Success", "Created Goal");
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function updateGoal(req, res) {
  const { id } = req.params;
  const updatedGoalData = req.body;

  try {
    const goals = await readJson(res, filePath);

    const updatedGoal = await updateGoalById(res, id, goals, updatedGoalData);

    const result = await writeJson(res, filePath, updatedGoal);
    sendResponse(res, 200, "Success", `Updated Goal with ID ${id}`);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function validateGoalById(req, res) {
  const { id } = req.params;
  const validateParam = req.query.q;
  console.log(validateParam);
  const validateValue = validateParam === "complete" ? true : false;
  try {
    const goals = await readJson(res, filePath);
    const validateGoals = await validateGoal(res, id, goals, validateValue);
    const result = await writeJson(res, filePath, goals);
    sendResponse(res, 200, "Success", "Completeness status has been changed");
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function deleteGoal(req, res) {
  const { id } = req.params;

  try {
    const goals = await readJson(res, filePath);
    const goalToDeleteIndex = findIndexById(res, id, goals);

    goals.splice(goalToDeleteIndex, 1);

    await writeJson(res, filePath, goals);

    sendResponse(
      res,
      200,
      "Success",
      `Goal with ID ${id} deleted. Goals remaining: ${goals.length}`
    );
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

const goalsController = {
  getGoals,
  getGoalById,
  getGoalsByStatus,
  createGoal,
  validateGoalById,
  updateGoal,
  deleteGoal,
};

export default goalsController;
