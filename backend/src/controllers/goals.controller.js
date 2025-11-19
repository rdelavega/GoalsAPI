import sendResponse from "../utils/sendResponse.js";
import readJson from "../utils/readJson.js";
import writeJson from "../utils/writeJson.js";
import findById from "../utils/findById.js";
import findByName from "../utils/findByName.js";
import filterGoals from "../utils/filterGoals.js";
import validateGoal from "../utils/validateGoal.js";
import updateGoalById from "../utils/updateGoalById.js";
import findIndexById from "../utils/findIndexById.js";
import { v4 as uuidv4 } from "uuid";
import findIndexByName from "../utils/findIndexById.js";
//Config
const filePath =
  "/home/rdelavega/CodingPractice/GoalsAPI/backend/src/data/goals.json";

// TODO with new UI refactor getting and deleting goals
async function getGoals(req, res) {
  try {
    const goals = await readJson(res, filePath);
    sendResponse(res, 200, "Success", goals);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

// TODO refactor pagination for missing data

async function getGoalsPaginated(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log(skip);
  console.log(req.query);

  console.log(`Initial index: ${skip}, while index less than ${limit + skip}`);

  try {
    const goals = await readJson(res, filePath);
    let results = [];
    for (let i = skip; i < limit + skip; i++) {
      if (goals[i] !== undefined && i < goals.length) {
        results.push(goals[i]);
      }
    }

    if (results.length === 0) {
      return sendResponse(res, 409, "No content", "Return to previous page");
    } else {
      return sendResponse(
        res,
        200,
        `Page: ${page} Goals returned: ${results.length}`,
        results
      );
    }
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
  const searchStatus = req.query.completed;
  const statusValue = searchStatus === "true" ? true : false;
  try {
    const goals = await readJson(res, filePath);
    const goalsByStatus = filterGoals(res, goals, statusValue);
    sendResponse(res, 200, "Success", goalsByStatus);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

async function createGoal(req, res) {
  const { goalData } = req.body;
  if (!req.body.id) {
    goalData.id = uuidv4();
  }

  goalData.start_date = new Date().toDateString();
  goalData.end_date = new Date().toDateString();

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

// ! FIX
async function updateGoal(req, res) {
  const { id } = req.params;
  const updatedGoalData = req.body;

  try {
    const goals = await readJson(res, filePath);

    const updatedGoal = await updateGoalById(res, goals, id, updatedGoalData);

    const result = await writeJson(res, filePath, updatedGoal);
    sendResponse(res, 200, "Success", `Updated Goal with ID ${id}`);
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

// ! FIX
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

// ! FIX

async function deleteGoal(req, res) {
  const { id } = req.params;

  try {
    const goals = await readJson(res, filePath);
    const goalToDeleteIndex = findIndexById(res, goals, id);

    goals.splice(goalToDeleteIndex, 1);

    await writeJson(res, filePath, goals);

    sendResponse(
      res,
      204,
      "Success, No Content",
      `Goal with ID ${id} deleted. Goals remaining: ${goals.length}`
    );
  } catch (err) {
    sendResponse(res, 500, "Error", err.message);
  }
}

const goalsController = {
  getGoals,
  getGoalById,
  getGoalsPaginated,
  getGoalsByStatus,
  createGoal,
  validateGoalById,
  updateGoal,
  deleteGoal,
};

export default goalsController;
