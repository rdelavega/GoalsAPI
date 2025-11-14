import { useEffect, useState } from "react";

const GoalsTable = (props) => {
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/goals");
        if (!response.ok) {
          throw new Error(`HTTP error!, status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const result = jsonResponse.data;
        result.forEach((goal) => {
          console.log(goal.name);
        });
        setGoals(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Complete Status</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {goals.forEach((goal, index) => {
            <th>
              <td key={index}>{index + 1}</td>
              <td key={index}>{goal.name}</td>
              <td key={index}>{goal.start_date}</td>
              <td key={index}>{goal.end_date}</td>
              <td key={index}>
                {goal.completed ? "Completed" : "Incompleted"}
              </td>
            </th>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsTable;
