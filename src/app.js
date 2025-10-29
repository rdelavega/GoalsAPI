const express = require("express");
const { goals } = require("./data/goals.json");

const app = express();
const port = 4001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/goals", (req, res) => {
  res.send(goals);
  console.log(goals[0]);
});

app.get("/goals/:id", (req, res) => {
  const { id } = req.params;
  for (let i = 0; i < goals.length; i++) {
    if (goals[i].id == id) {
      res.send(goals[i]);
    }
  }
});

app.post("/goals", (req, res) => {
  console.log(req.body);
  const { id, name, start_date, end_date, completed } = req.body;
  for (let i = 0; i < goals.length; i++) {
    if (id !== goals[i].id) {
      goals.push({ id, name, start_date, end_date, completed });
      console.log(`Created Goal with ID: ${id}`);
      break;
    }
  }
  res.send(req.body);
});

// TODO: Repair put route for updating goals
app.put("/goals/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const goalData = req.body;
  // for (let i = 0; i < goals.length; i++) {
  //   if (id === goals[i].id) {
  //     const goalToUpdate = goals[i].id;
  //     console.log(goalToUpdate);
  //     goals[i].name = goalData.name;
  //     goals[i].start_date = goalData.start_date;
  //     goals[i].end_date = goalData.end_date;
  //     goals[i].completed = goalData.completed;
  //   }
  //   break;
  // }
  res.send(`Updated Goal with ID: ${id}`);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
