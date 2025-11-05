import express from "express";
import goalsController from "../controllers/goals.controller.js";

const router = express.Router();

router.get("/goals", goalsController.getGoals);

router.get("/goals/status", goalsController.getGoalsByStatus);

router.get("/goals/:id", goalsController.getGoalById);

router.post("/goals", goalsController.createGoal);

router.put("/goals/complete/:id", goalsController.completeGoalById);

router.put("/goals/incomplete/:id", goalsController.incompleteGoalById);

router.put("/goals/:id", goalsController.updateGoal);

router.delete("/goals/:id", goalsController.deleteGoal);

export default router;
