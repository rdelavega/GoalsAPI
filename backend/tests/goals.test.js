import request from "supertest";
import app from "../src/app.js";
import { expect } from "chai";
import { describe, it } from "mocha";
import { readFile, writeFile } from "fs/promises";
import generateGoalPayload from "./helpers/generateGoalPayload.js";
import generateGoalPayloadWithId from "./helpers/generateGoalPayloadWithId.js";
import getExistingGoalById from "./helpers/getGoalById.js";
import { v4 as uuidv4 } from "uuid";
//Config
const filePath =
  "/home/rdelavega/CodingPractice/GoalsAPI/backend/src/data/goals.json";
// TODO: pass all test suites
describe("API CRUD operations", () => {
  // *Passed
  describe("GET /api/goals/", () => {
    it("should get all goals", async () => {
      const res = await request(app).get("/api/goals");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get goals by page and limit", async () => {
      const res = await request(app).get("/api/goals?page=1&limit=10");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should find a goal by name", async () => {
      const res = await request(app).get("/api/goals/find?name=Random%20Goal");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get all completed goals", async () => {
      const res = await request(app).get("/api/goals?completed=true");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get all incompleted goals", async () => {
      const res = await request(app).get("/api/goals?completed=false");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  });

  // * Passed with edge cases
  describe("POST /api/goals/", () => {
    it("should create a new goal", async () => {
      const newGoal = await generateGoalPayload(false);

      const res = await request(app).post("/api/goals").send(newGoal);

      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
    });
  });
  describe("PUT /api/goals/", () => {
    it("should update an existing goal by id", async () => {
      const updateGoalPayload = {
        name: "Update Goal with Testing",
        start_date: "15/07/25",
        end_date: "25/11/25",
        completed: true,
      };

      const res = await request(app)
        .put(`/api/goals/${updateGoalPayload.name}`)
        .send(updateGoalPayload)
        .expect(200)
        .expect("Content-Type", /json/);

      console.log(res.body);
    });

    it("should mark as complete an existing goal by id", async () => {
      const goalToComplete = {
        name: "Completed Goal",
        start_date: "12/12/25",
        end_date: "13/13/13",
        completed: false,
      };

      const content = await readFile(filePath, { encoding: "utf8" });
      const goals = JSON.parse(content);
      goals.push(goalToComplete);
      const contentToWrite = JSON.stringify(goals, null, 2);
      const write = await writeFile(filePath, contentToWrite, {
        encoding: "utf8",
      });
      const res = await request(app)
        .put(`/api/goals/${goalToComplete.name}/validate?q=complete`)
        .expect(200);
    });

    it("should mark as incomplete an existing goal by id", async () => {
      const goalToIncomplete = {
        name: "Incompleted Goal",
        start_date: "12/12/25",
        end_date: "13/13/13",
        completed: true,
      };

      const content = await readFile(filePath, { encoding: "utf8" });
      const goals = JSON.parse(content);
      goals.push(goalToIncomplete);
      const contentToWrite = JSON.stringify(goals, null, 2);
      const write = await writeFile(filePath, contentToWrite, {
        encoding: "utf8",
      });
      const res = await request(app)
        .put(`/api/goals/${goalToIncomplete.name}/validate?q=incomplete`)
        .expect(200);
    });
  });

  // ? Passing, test edge cases
  describe("DELETE /api/goals/", () => {
    it("should delete an existing goal by ID", async () => {
      const goalToDelete = {
        id: uuidv4(),
        name: "Deleted Goal",
        start_date: "12/12/25",
        end_date: "13/13/13",
        completed: true,
      };
      const content = await readFile(filePath, { encoding: "utf8" });
      const goals = JSON.parse(content);
      goals.push(goalToDelete);
      const contentToWrite = JSON.stringify(goals, null, 2);
      const write = await writeFile(filePath, contentToWrite, {
        encoding: "utf8",
      });
      const res = await request(app)
        .delete(`/api/goals/${goalToDelete.name}`)
        .expect(204);
    });
  });

  describe("API Edge Cases & Error Handling", () => {
    describe("GET Edge Cases", () => {
      it("should fail getting a non existing goal", async () => {
        const res = await request(app).get("/api/goals/0");
        expect(res.status).to.equal(404);
      });
    });
    describe("POST Edge Cases", () => {
      it("should fail attempting to create a goal with required data", async () => {
        const newGoal = await generateGoalPayload("");

        const res = await request(app).post("/api/goals").send(newGoal);

        expect(res.status).to.equal(409);
      });

      it("should fail attempting to create a goal without a payload", async () => {
        const res = await request(app).post("/api/goals").send();

        expect(res.status).to.equal(409);
      });
    });

    describe("PUT Edge Cases", () => {
      it("should fail to update a goal with missing data", async () => {
        const updateGoalIncompletePayload = {
          start_date: "15/07/25",
          end_date: "25/11/25",
          completed: true,
        };

        const res = await request(app)
          .put("/api/goals/10")
          .send(updateGoalIncompletePayload);

        expect(res.status).to.equal(409);
      });

      it("should fail updating a goal id", async () => {
        const newGoalUpdatePaylaod = await generateGoalPayload(true);

        const res = await request(app)
          .put("/api/goals/10")
          .send(newGoalUpdatePaylaod)
          .expect(409);
      });
    });
  });
});
