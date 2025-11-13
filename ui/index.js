const baseURL = "http://localhost:4001/api/goals/";

async function getGoals() {
  try {
    const response = await fetch(baseURL);
    const jsonResponse = await response.json();
    const goals = jsonResponse.data;
    const tableBody = document.getElementById("table-body");
    const tableRows = goals.map((goal, index) => {
      return `<tr>
        <th scope="row">${index + 1}</th>
        <td>${goal.name}</td>
        <td>${goal.start_date}</td>
        <td>${goal.end_date}</td>
        <td>${goal.completed ? "Completed" : "Incompleted"}</td>
     </tr>`;
    });
    tableBody.innerHTML = tableRows.join("");
  } catch (err) {
    alert("Error fetching API", err.message);
    console.log(err.message);
  }
}

const form = document.getElementById("create-goal-form");

async function createGoal(event) {
  try {
    const log = document.getElementById("log");
    log.textContent = `Attempting form submitting: ${event.timeStamp}`;
    event.preventDefault();
    const data = {
      name: document.getElementById("goal-name").value,
      start_date: document.getElementById("goal-startDate").value,
      end_date: document.getElementById("goal-endDate").value,
      completed: document.getElementById("goal-completedCheck").checked
        ? true
        : false,
    };
    console.log(data);
    const response = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    alert("Error creating Goal");
  }
}

// !Fix
async function deleteGoal(event) {
  try {
    event.preventDefault();

    const name = document.getElementById("deleted-goal-name").value;

    let url = baseURL + name;
    console.log(url);
    const response = await fetch(`http://localhost:4001/api/goals/${name}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Goal deleted succesfully");
    return response.status === 204 ? null : response.json();
  } catch (err) {
    alert("Error deleting Goal");
  }
}

getGoals();

form.addEventListener("submit", createGoal);
