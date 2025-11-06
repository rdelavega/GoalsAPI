async function generateGoalPayloadWithId(id) {
  const goalPayload = {
    id: id,
    name: `Random Goal`,
    start_date: new Date().toLocaleDateString(),
    end_date: "25/11/25",
    completed: false,
  };
  return goalPayload;
}

export default generateGoalPayloadWithId;
