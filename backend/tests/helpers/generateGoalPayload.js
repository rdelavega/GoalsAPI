async function generateGoalPayload() {
  const goalPayload = {
    goal_name: `Random Goal`,
    goal_category: "Programming",
    start_date: new Date(Date.now()).toISOString(),
    end_date: new Date("22 December 2025 14:48 UTC").toISOString(),
    complete: false,
  };
  return goalPayload;
}

export default generateGoalPayload;
