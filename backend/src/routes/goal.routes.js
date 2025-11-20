import express from "express";
import { goalsController } from "../controllers/goals.controller.js";
import { query } from "../db/index.js";
import validateRoute from "../middleware/validateRoute.js";
import logger from "../middleware/logger.js";
import validatePutRoute from "../middleware/validateUpdateRoute.js";

const router = express.Router();
const controller = goalsController({ query });

router.use(logger);
router.use(validateRoute);

router.get("/goals/:id", controller.getGoalById);

router.get("/goals", controller.getGoals);

router.get("/goals", controller.getGoalsByStatus);

// router.get("/goals", goalsController.getGoalsPaginated);

router.post("/goals", controller.createGoal);

router.put("/goals/:id/validate", controller.validateGoalById);

router.put("/goals/:id", validatePutRoute, controller.updateGoal);

router.delete("/goals/:id", controller.deleteGoal);

export default router;
