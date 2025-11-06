import request from "supertest";
import app from "../src/app.js";
import { expect } from "chai";
import { describe, it } from "mocha";
import { readFile, writeFile } from "fs/promises";
import generateGoalPayload from "./helpers/generateGoalPayload.js";
import generateGoalPayloadWithId from "./helpers/generateGoalPayloadWithId.js";
import getExistingGoalById from "./helpers/getGoalById.js";
//Config
const filePath = "/home/rdelavega/CodingPractice/GoalsAPI/src/data/goals.json";
// TODO: pass all test suites
describe("API CRUD operations", () => {
  // *Passed
  describe("GET /api/goals/", () => {
    it("should get all goals", async () => {
      const res = await request(app).get("/api/goals");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get a goal by id", async () => {
      const res = await request(app).get("/api/goals/2");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get all completed goals", async () => {
      const res = await request(app).get("/api/goals/status?q=complete");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get all incompleted goals", async () => {
      const res = await request(app).get("/api/goals/status?q=incomplete");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should fail getting a non existing goal", async () => {
      const res = await request(app).get("/api/goals/0");
      expect(res.status).to.equal(404);
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

    // Edge cases

    it("should fail attempting to create a goal with same id as others", async () => {
      const existingGoalId = await getExistingGoalById(2);

      const newGoal = await generateGoalPayloadWithId(existingGoalId);
      const res = await request(app).post("/api/goals").send(newGoal);

      expect(res.status).to.equal(409);
    });

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

  //? Passed, test edge cases
  describe("PUT /api/goals/", () => {
    it("should update an existing goal by id", async () => {
      const updateGoalPayload = {
        name: "Update Goal with Testing",
        start_date: "15/07/25",
        end_date: "25/11/25",
        completed: true,
      };

      const res = await request(app)
        .put("/api/goals/10")
        .send(updateGoalPayload)
        .expect(200)
        .expect("Content-Type", /json/);
    });
    it("should mark as complete an existing goal by id", async () => {
      const goalToComplete = {
        id: Math.floor(Math.random() * 1000),
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
        .put(`/api/goals/${goalToComplete.id}/validate?q=complete`)
        .expect(200);
    });

    it("should mark as incomplete an existing goal by id", async () => {
      const goalToIncomplete = {
        id: Math.floor(Math.random() * 1000),
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
        .put(`/api/goals/${goalToIncomplete.id}/validate?q=incomplete`)
        .expect(200);
    });
  });

  // ? Passing, test edge cases
  describe("DELETE /api/goals/", () => {
    it("should delete an existing goal by ID", async () => {
      const goalToDelete = {
        id: Math.floor(Math.random() * 1000),
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
        .delete(`/api/goals/${goalToDelete.id}`)
        .expect(200);
    });
  });
});
