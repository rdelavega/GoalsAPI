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

async function getGoals(req, res) {
  try {
    const goals = await readJson(filePath, res);
    sendResponse(res, 200, "Goals", goals);
  } catch (parseErr) {
    sendResponse(res, 500, "Error", parseErr);
  }
}

async function getGoalById(req, res) {
  const { id } = req.params;

  try {
    const goals = await readJson(filePath, res);
    const goalToFind = findById(goals, id, res);
    return sendResponse(res, 200, `Goal ${id}`, goalToFind);
  } catch (err) {
    sendResponse(res, 500, "Error", err);
  }
}

// TODO: Refactor routes with query ?status=complete/incomplete instead of True = Completed, False = Incompleted
async function getCompletedGoals(req, res) {
  try {
    const goals = await readJson(filePath, res);
    const completedGoals = filterGoals(res, goals, true);
    sendResponse(res, 200, "Goals", completedGoals);
  } catch (err) {
    sendResponse(res, 500, "Error", err);
  }
}

async function getIncompletedGoals(req, res) {
  try {
    const goals = await readJson(filePath, res);
    const incompletedGoals = filterGoals(res, goals, false);
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
    !goalData.id |
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
    const goals = await readJson(filePath, res);
    const existingGoal = findById(goals, goalData.id, res);
    if (existingGoal) {
      return sendResponse(
        res,
        409,
        "Error",
        "Theres an already existing goal with that id"
      );
    }

    goals.push(goalData);
    const result = await writeJson(filePath, goals, res);
    sendResponse(res, 201, "Success", "Created Goal");
  } catch (err) {
    sendResponse(res, 500, "Error Creating Goal", err);
  }
}

// TODO validate from query instead of 2 routes for completing or incompleting
async function completeGoalById(req, res) {
  const { id } = req.params;

  try {
    const goals = await readJson(filePath, res);
    const validatedGoals = await validateGoal(id, goals, true, res);
    const result = await writeJson(filePath, goals, res);
  } catch (err) {
    sendResponse(res, 500, "Error completing goal", err);
  }
}

async function incompleteGoalById(req, res) {
  const { id } = req.params;
  try {
    const goals = await readJson(filePath, res);
    const invalidatedGoals = await validateGoal(id, goals, false, res);
    const result = await writeJson(filePath, goals, res);
  } catch (err) {
    sendResponse(res, 500, "Error invalidating goal", err);
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

  if (
    !updatedGoalData.name |
    !updatedGoalData.start_date |
    !updatedGoalData.end_date |
    !updatedGoalData.completed
  ) {
    return sendResponse(
      res,
      409,
      "Error",
      "There is no data for updating goal"
    );
  }
  try {
    const goals = await readJson(filePath, res);

    const updatedGoals = await updateGoalById(id, goals, updatedGoalData, res);

    const result = await writeJson(filePath, updatedGoals, res);
    sendResponse(res, 200, "Success", "Updated Goal");
  } catch (err) {
    sendResponse(res, 500, "Error updating goal", err);
  }
}

async function deleteGoal(req, res) {
  const { id } = req.params;

  try {
    const goals = await readJson(filePath, res);
    const goalToDeleteIndex = findIndexById(id, goals, res);

    goals.splice(goalToDeleteIndex, 1);

    await writeJson(filePath, goals, res);

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

const goalsController = {
  getGoals,
  getGoalById,
  getCompletedGoals,
  getIncompletedGoals,
  createGoal,
  completeGoalById,
  incompleteGoalById,
  updateGoal,
  deleteGoal,
};

export default goalsController;
