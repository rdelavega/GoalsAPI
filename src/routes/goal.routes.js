const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goals.controller");

router.get("/goals", goalsController.getGoals);

router.get("/goals/:id", goalsController.getGoalById);

router.get("/completed", goalsController.getCompletedGoals);

router.get("/incomplete", goalsController.getIncompletedGoals);

router.post("/goals", goalsController.createGoal);

router.post("/goals/validate/:id", goalsController.validateGoalById);

router.post("/goals/invalidate/:id", goalsController.invalidateGoalById);

router.put("/goals/:id", goalsController.updateGoal);

router.delete("/goals/:id", goalsController.deleteGoal);

module.exports = router;
