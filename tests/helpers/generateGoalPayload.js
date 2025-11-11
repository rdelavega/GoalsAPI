import { v4 as uuidv4 } from "uuid";

async function generateGoalPayload(completed) {
  const goalPayload = {
    id: uuidv4(),
    name: `Random Goal`,
    start_date: new Date(Date.now()).toISOString(),
    end_date: new Date("22 December 2025 14:48 UTC").toISOString(),
    completed: completed,
  };
  return goalPayload;
}

export default generateGoalPayload;
