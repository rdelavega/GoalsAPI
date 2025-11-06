import { readFile } from "fs/promises";

const filePath = "/home/rdelavega/CodingPractice/GoalsAPI/src/data/goals.json";

async function getExistingGoalById(id) {
  const content = await readFile(filePath, { encoding: "utf8" });
  const goals = JSON.parse(content);
  const goalToFind = goals.find((goal) => goal.id === id);
  if (goalToFind) {
    return goalToFind.id;
  }

  return goals[0].id;
}

export default getExistingGoalById;
