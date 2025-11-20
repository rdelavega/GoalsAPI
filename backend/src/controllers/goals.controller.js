import sendResponse from "../utils/sendResponse.js";

// controllers/goalsController.js
export function goalsController({ query }) {
  return {
    async getGoals(req, res) {
      try {
        const result = await query("SELECT * FROM goals ORDER BY goal_id ASC");
        sendResponse(res, 200, "Success", result.rows);
      } catch (err) {
        sendResponse(res, 500, "Error", err.message);
      }
    },
    async getGoalById(req, res) {
      const { id } = req.params;

      try {
        const result = await query("SELECT * FROM goals WHERE goal_id = $1", [
          id,
        ]);

        if (result.rows.length === 0) {
          return sendResponse(res, 404, "Error", "Goal not found");
        }

        sendResponse(res, 200, "Success", result.rows[0]);
      } catch (err) {
        sendResponse(res, 500, "Error", err.message);
      }
    },

    async getGoalsByStatus(req, res) {
      const searchStatus = req.query.complete;
      const statusValue = searchStatus === "true" ? true : false;
      try {
        const result = await query("SELECT * FROM goals WHERE complete = $1", [
          statusValue,
        ]);

        if (result.rows.length === 0) {
          return sendResponse(res, 404, "Error", "Goals not found");
        }
        sendResponse(res, 200, "Success", result.rows);
      } catch (err) {
        sendResponse(res, 500, "Error", err.message);
      }
    },

    async createGoal(req, res) {
      const { goal_name, goal_category, start_date, end_date, complete } =
        req.body;
      try {
        const result = await query(
          "INSERT INTO goals (goal_name, goal_category, start_date, end_date, complete) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [goal_name, goal_category, start_date, end_date, complete]
        );
        sendResponse(res, 201, "Created Goal", result.rows[0]);
      } catch (err) {
        sendResponse(res, 500, "Error", err.message);
      }
    },

    async updateGoal(req, res) {
      const { id } = req.params;
      const { goal_name, goal_category, start_date, end_date, complete } =
        req.body;

      try {
        const result = await query(
          "UPDATE goals SET goal_name = $1, goal_category = $2, start_date = $3, end_date = $4, complete = $5 WHERE goal_id = $6",
          [goal_name, goal_category, start_date, end_date, complete, id]
        );

        if (result.rows.length > 0) {
          sendResponse(res, 200, "Updated", json(result.rows[0]));
        }
      } catch (err) {
        console.log(err.message);
        sendResponse(res, 500, "Error", err.message);
      }
    },

    async validateGoalById(req, res) {
      const { id } = req.params;
      const validateParam = req.query.q;
      const validateValue = validateParam === "complete" ? true : false;
      try {
        const result = await query(
          "UPDATE goals SET complete = 1$ WHERE goal_id = $2",
          [validateValue, id]
        );

        if (result.rows.length > 0) {
          sendResponse(res, 200, "Success", result.rows[0]);
        }

        sendResponse(
          res,
          200,
          "Success",
          "Completeness status has been changed"
        );
      } catch (err) {
        sendResponse(res, 500, "Error", err.message);
      }
    },
    async deleteGoal(req, res) {
      const { id } = req.params;

      try {
        const response = await query("DELETE FROM goals WHERE goal_id = $1", [
          id,
        ]);

        sendResponse(
          res,
          204,
          "Success, No Content",
          `Goal with ID ${id} deleted. Goals remaining: ${response.rows.length}`
        );
      } catch (err) {
        sendResponse(res, 500, "Error", err.message);
      }
    },
  };
}

// async function getGoals(req, res) {
//   try {
//     const result = await query("SELECT * FROM goals ORDER BY goal_id DESC");
//     sendResponse(res, 200, "Success", result.rows);
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// // TODO refactor pagination with database

// async function getGoalsPaginated(req, res) {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;
//   console.log(skip);
//   console.log(req.query);

//   console.log(`Initial index: ${skip}, while index less than ${limit + skip}`);

//   try {
//     const goals = await query(
//       "SELECT * FROM goals ORDER BY goal_id DESC LIMIT $1 OFFSET $2",
//       [limit, skip]
//     );
//     let results = [];
//     for (let i = skip; i < limit + skip; i++) {
//       if (goals[i] !== undefined && i < goals.length) {
//         results.push(goals[i]);
//       }
//     }

//     if (results.length === 0) {
//       return sendResponse(res, 409, "No content", "Return to previous page");
//     } else {
//       return sendResponse(
//         res,
//         200,
//         `Page: ${page} Goals returned: ${results.length}`,
//         results
//       );
//     }
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// async function getGoalById(req, res) {
//   const { id } = req.params;

//   try {
//     const result = await query("SELECT * FROM goals WHERE goal_id = $1", [id]);

//     if (result.rows.length === 0) {
//       return sendResponse(res, 404, "Error", "Goal not found");
//     }

//     sendResponse(res, 200, "Success", result.rows[0]);
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// async function getGoalsByStatus(req, res) {
//   const searchStatus = req.query.complete;
//   const statusValue = searchStatus === "true" ? true : false;
//   try {
//     const result = await query("SELECT * FROM goals WHERE complete = $1", [
//       statusValue,
//     ]);

//     if (result.rows.length === 0) {
//       return sendResponse(res, 404, "Error", "Goals not found");
//     }
//     sendResponse(res, 200, "Success", result.rows);
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// async function createGoal(req, res) {
//   const { goal_name, goal_category, start_date, end_date, complete } = req.body;
//   try {
//     const result = await query(
//       "INSERT INTO goals (goal_name, goal_category, start_date, end_date, complete) VALUES($1, $2, $3, $4, $5) RETURNING *",
//       [goal_name, goal_category, start_date, end_date, complete]
//     );
//     sendResponse(res, 201, "Created Goal", result.rows[0]);
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// // ! FIX
// async function updateGoal(req, res) {
//   const { id } = req.params;
//   const { goal_name, goal_category, start_date, end_date, complete } = req.body;

//   try {
//     const result = await query(
//       "UPDATE goals SET goal_name = $1, goal_category = $2, start_date = $3, end_date = $4, complete = $5 WHERE goal_id = $6",
//       [goal_name, goal_category, start_date, end_date, complete, id]
//     );

//     if (result.rows.length > 0) {
//       sendResponse(res, 200, "Updated", json(result.rows[0]));
//     }
//   } catch (err) {
//     console.log(err.message);
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// // ! FIX
// async function validateGoalById(req, res) {
//   const { id } = req.params;
//   const validateParam = req.query.q;
//   const validateValue = validateParam === "complete" ? true : false;
//   try {
//     const result = await query(
//       "UPDATE goals SET complete = 1$ WHERE goal_id = $2",
//       [validateValue, id]
//     );

//     if (result.rows.length > 0) {
//       sendResponse(res, 200, "Success", result.rows[0]);
//     }

//     sendResponse(res, 200, "Success", "Completeness status has been changed");
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// // ! FIX

// async function deleteGoal(req, res) {
//   const { id } = req.params;

//   try {
//     const response = await query("DELETE FROM goals WHERE goal_id = $1", [id]);

//     sendResponse(
//       res,
//       204,
//       "Success, No Content",
//       `Goal with ID ${id} deleted. Goals remaining: ${response.rows.length}`
//     );
//   } catch (err) {
//     sendResponse(res, 500, "Error", err.message);
//   }
// }

// const goalsController = {
//   getGoals,
//   getGoalById,
//   getGoalsPaginated,
//   getGoalsByStatus,
//   createGoal,
//   validateGoalById,
//   updateGoal,
//   deleteGoal,
// };

// export default goalsController;
