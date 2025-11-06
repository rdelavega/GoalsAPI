import express from "express";
import goalsController from "../controllers/goals.controller.js";

const router = express.Router();

router.get("/goals", goalsController.getGoals);

router.get("/goals/status", goalsController.getGoalsByStatus);

router.get("/goals/:id", goalsController.getGoalById);

router.post("/goals", goalsController.createGoal);

router.put("/goals/:id", goalsController.updateGoal);

router.put("/goals/:id/validate", goalsController.validateGoalById);

router.delete("/goals/:id", goalsController.deleteGoal);

export default router;
