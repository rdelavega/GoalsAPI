import { React, useEffect, useState } from "react";
import CreateGoalForm from "./CreateGoalForm";

const GoalsTable = (props) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4001/api/goals");
        if (!response.ok) {
          throw new Error(`HTTP error!, status: ${response.status}`);
        }
        const data = await response.json();
        setGoals(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleDeleteGoal = async (goalId) => {
    const requestOptions = {
      method: "DELETE",
    };

    try {
      console.log(`Id to delete: ${goalId}`);
      const res = await fetch(
        `http://localhost:4001/api/goals/${goalId}`,
        requestOptions
      );

      const updatedGoals = goals.filter((goal) => goal.id !== goalId);
      setGoals(updatedGoals);
    } catch (error) {
      setError(error.message);
    }
  };

  const addGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!goals) return null;

  goals.map((goal) => {
    console.log(goal.name);
  });

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 text-center p-10">
        <h2 className="text-5xl font-bold p-20">Current Goals</h2>
        <table className="table table-auto">
          <thead>
            <tr className="text-xl text-[#ffffff] font-bold">
              <th>#</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Complete Status</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {goals.map((goal, index) => {
              return (
                <tr key={goal.id} className="hover:bg-base-300">
                  <td>{index + 1}</td>
                  <td>{goal.name}</td>
                  <td>{goal.start_date}</td>
                  <td>{goal.end_date}</td>
                  <td>
                    {goal.completed == true ? (
                      <div className="badge badge-soft badge-success">
                        Completed
                      </div>
                    ) : (
                      <div className="badge badge-soft badge-error">
                        Incompleted
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => {
                        console.log("clicked!");
                        goal.completed = true;
                        setGoals((prev) => [...prev]);
                      }}
                    >
                      ✔
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        handleDeleteGoal(goal);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* <button
            className="btn btn-circle btn-success mt-7 p-5"
            onClick={handleAddGoal}
          >
            +
          </button> */}
          </tbody>
        </table>
      </div>
      <div>
        <CreateGoalForm onCreateGoal={addGoal} />
      </div>
    </>
  );
};

export default GoalsTable;
