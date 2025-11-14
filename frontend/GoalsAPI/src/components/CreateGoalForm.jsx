const CreateGoalForm = () => {
  return (
    <div>
      <h2>Create new Goal</h2>
      <form id="create-goal-form">
        <div className="form-group">
          <label for="goal-name">Goal Name</label>
          <input
            type="text"
            className="input"
            id="goal-name"
            aria-describedby="goalHelp"
            placeholder="Get better grades..."
          />
        </div>
        <div className="form-group">
          <label for="goal-startDate">Start Date</label>
          <input
            type="date"
            className="input"
            id="goal-startDate"
            placeholder="12/12/2024"
          />
        </div>
        <div className="form-group">
          <label for="goal-endDate">End Date</label>
          <input
            type="date"
            className="input"
            id="goal-endDate"
            placeholder="01/01/2025"
          />
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            className="input"
            id="goal-completedCheck"
            name="true"
          />
          <label className="form-check-label" for="goal-completedCheck">
            Completed
          </label>
        </div>
        <button type="submit" className="btn btn-success" id="create-goal-btn">
          Create
        </button>
      </form>
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span id="log">Your goal has been created!</span>
      </div>
    </div>
  );
};

export default CreateGoalForm;
