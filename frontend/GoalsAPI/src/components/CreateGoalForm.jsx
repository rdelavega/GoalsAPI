import { useState } from "react";

const CreateGoalForm = ({ onCreateGoal }) => {
  const [goalData, setGoalData] = useState({
    goal_name: "",
    goal_category: "",
    start_date: "",
    end_date: "",
    complete: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("http://localhost:4001/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onCreateGoal(goalData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log(goalData);
  return (
    <div className="w-full">
      <form
        className="shadow-md rounder px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-center text-5xl p-2">Create Goal</h1>
        <div className="space-y-12">
          <div className="border-b border-base/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-xl font-medium text-base"
                >
                  Goal Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-base/5 pl-3 outline-1 -outline-offset-1 outline-base/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6"></div>
                    <input
                      id="goal_name"
                      name="goal_name"
                      type="text"
                      onChange={(e) =>
                        setGoalData({ ...goalData, goal_name: e.target.value })
                      }
                      value={goalData.goal_name}
                      placeholder="Eat healthier..."
                      className="block min-w-0 grow bg-base py-1.5 pr-3 pl-1 text-base text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <select
            id="goal_category"
            name="goal_category"
            defaultValue="Study"
            className="select"
            onChange={(e) =>
              setGoalData({ ...goalData, goal_category: e.target.value })
            }
            value={goalData.goal_category}
          >
            <option disabled={true}>Selelect a category</option>
            <option>Programming</option>
            <option>Study</option>
            <option>Health</option>
          </select>

          <div className="border-b border-base/10 pb-12">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="start-date"
                  className="block text-xl font-medium text-base"
                >
                  Start Date
                </label>
                <div className="mt-2">
                  <input
                    id="start-date"
                    name="start-date"
                    type="date"
                    onChange={(e) =>
                      setGoalData({
                        ...goalData,
                        start_date: e.target.value,
                      })
                    }
                    value={goalData.start_date}
                    className="block w-full rounded-md bg-base/5 px-3 py-1.5 text-base text-base outline-1 -outline-offset-1 outline-base/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="end-date"
                  className="block text-xl font-medium text-base"
                >
                  End Date
                </label>
                <div className="mt-2">
                  <input
                    id="end-date"
                    name="end-date"
                    type="date"
                    onChange={(e) =>
                      setGoalData({
                        ...goalData,
                        end_date: e.target.value,
                      })
                    }
                    value={goalData.end_date}
                    className="block w-full rounded-md bg-base/5 px-3 py-1.5 text-base text-base outline-1 -outline-offset-1 outline-base/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box">
                  <label className="label bg-base-100 text-xl">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) =>
                        setGoalData({
                          ...goalData,
                          complete: e.target.value == "on" ? true : false,
                        })
                      }
                      value={goalData.complete}
                    />
                    Complete
                  </label>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="btn btn-error text-base-100">
            Cancel
          </button>
          <button type="submit" className="btn btn-success text-base-100">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoalForm;
