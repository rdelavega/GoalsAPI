function findById(res, goals, id) {
  const goalToFind = goals.find((goal) => goal.id === parseInt(id));

  return goalToFind;
}

export default findById;
