async function generateGoalPayload(completed) {
  const goalPayload = {
    id: Math.floor(Math.random() * 20000),
    name: `Random Goal`,
    start_date: new Date().toLocaleDateString(),
    end_date: "25/11/25",
    completed: completed,
  };
  return goalPayload;
}

export default generateGoalPayload;
