const express = require("express");
const { goals } = require("./data/goals.json");

const app = express();
const port = 4001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/goals", (req, res) => {
  if (goals.length === 0) {
    return res.status(404).send("No Goals added in db");
  }
  res.send(goals);
  console.log(goals[0]);
});

app.get("/goals/:id", (req, res) => {
  const { id } = req.params;
  goalToFind = goals.find((goal) => goal.id === parseInt(id));

  if (!goalToFind) {
    return res.status(404).send("Goal not found");
  }

  res.send(goalToFind);
});

app.get("/completed", (req, res) => {
  const completed = goals.filter((goal) => goal.completed === true);

  if (completed.length === 0) {
    return res.status(404).send("Error 404. Completed Goals not found");
  }

  res.status(200).json(completed);
});

app.post("/goals", (req, res) => {
  const { id, name, start_date, end_date, completed } = req.body;

  const findExistingGoal = goals.find((goal) => goal.id === id);

  if (findExistingGoal) {
    return res.status(400).send("Attempting to create goal with same id");
  }

  goals.push({ id, name, start_date, end_date, completed });
  res.status(201).send("Created goal with ID", id);
});

app.post("/goals/validate/:id", (req, res) => {
  const { id } = req.params;

  const goalToComplete = goals.find((goal) => goal.id === id);

  if (!goalToComplete) {
    res.status(404).send("Goal not found");
  }

  goalToComplete.completed = true;

  res.status(200).send(`Goal with ID ${id} completed`);
});

app.post("/goals/invalidate/:id", (req, res) => {
  const { id } = req.params;

  const goalToIncomplete = goals.find((goal) => goal.id === id);

  if (!goalToIncomplete) {
    res.status(404).send("Goal not found");
  }

  goalToIncomplete.completed = false;
  res.status(200)(`Goal with ID ${id} marked as incompleted`);
});

// TODO: Repair put route for updating goals
app.put("/goals/:id", (req, res) => {
  const { id } = req.params;
  const updatedGoalData = req.body;

  const goalToUpdateIndex = goals.findIndex((goal) => goal.id === id);

  if (goalToUpdateIndex !== -1) {
    goals[goalToUpdateIndex] = { ...updatedGoalData, id: id };
    res.status(200).json(goals[goalToUpdateIndex]);
  } else {
    res.status(404).json({ message: "Goal not found" });
  }
});

app.delete("/goals/:id", (req, res) => {
  const { id } = req.params;
  const deletedGoal = goals.filter((goal) => goal.id !== id);

  if (!deletedGoal) {
    return res.status(404).send("Goal not found");
  }

  res.send(`Deleted Goal with ID: ${id}, Goals remaining: ${deletedGoal}`);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
