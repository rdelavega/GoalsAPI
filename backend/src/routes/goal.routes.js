import express from "express";
import goalsController from "../controllers/goals.controller.js";
import validateRoute from "../middleware/validateRoute.js";
import logger from "../middleware/logger.js";
import validatePutRoute from "../middleware/validateUpdateRoute.js";

const router = express.Router();

router.use(logger);
router.use(validateRoute);

router.get("/goals/:id", goalsController.getGoalById);
router.get("/goals", goalsController.getGoals);

// router.get("/goals", goalsController.getGoalsPaginated);

router.get("/goals", goalsController.getGoalsByStatus);

router.post("/goals", goalsController.createGoal);

router.put("/goals/:id/validate", goalsController.validateGoalById);

router.put("/goals/:id", validatePutRoute, goalsController.updateGoal);

router.delete("/goals/:id", goalsController.deleteGoal);

export default router;
