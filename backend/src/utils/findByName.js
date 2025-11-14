function findByName(res, goals, name) {
  const goalToFind = goals.find((goal) => goal.name === name);

  return goalToFind;
}

export default findByName;
