import express from "express";
import goalsController from "../controllers/goals.controller.js";
import validateRoute from "../middleware/validateRoute.js";
import logger from "../middleware/logger.js";
import validatePutRoute from "../middleware/validateUpdateRoute.js";

const router = express.Router();

router.use(logger);
router.use(validateRoute);

router.get("/goals", goalsController.getGoalsPaginated);

router.get("/goals", goalsController.getGoalsByStatus);

router.get("/goals", goalsController.getGoals);

router.get("/goals/find", goalsController.getGoalByName);

router.post("/goals", goalsController.createGoal);

router.put("/goals/:name/validate", goalsController.validateGoalByName);

router.put("/goals/:name", validatePutRoute, goalsController.updateGoalByName);

router.delete("/goals/:name", goalsController.deleteGoal);

export default router;
