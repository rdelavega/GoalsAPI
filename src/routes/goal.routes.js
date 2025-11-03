const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goals.controller");

router.get("/goals", goalsController.getGoals);

router.get("/goals/completed/", goalsController.getCompletedGoals);

router.get("/goals/incompleted/", goalsController.getIncompletedGoals);

router.get("/goals/:id", goalsController.getGoalById);

router.post("/goals", goalsController.createGoal);

router.put("/goals/validate/:id", goalsController.validateGoalById);

router.put("/goals/invalidate/:id", goalsController.invalidateGoalById);

router.put("/goals/:id", goalsController.updateGoal);

router.delete("/goals/:id", goalsController.deleteGoal);

module.exports = router;
