function completeGoal(id) {
  const { id, name, start_date, end_date, completed } = req.body;

  const findExistingGoal = goals.find((goal) => goal.id === parseInt(id));

  if (findExistingGoal) {
    return res.status(400).send("Attempting to create goal with same id");
  }

  goals.push({ id, name, start_date, end_date, completed });
  res.status(201).send("Created goal with ID", id);
}
