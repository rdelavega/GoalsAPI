import request from "supertest";
import app from "../src/app.js";
import { expect } from "chai";
import { describe, it } from "mocha";

// TODO pass all test suites
describe("API CRUD operations", () => {
  // *Passed
  describe("GET /api/goals/", () => {
    it("should get all goals", async () => {
      const res = await request(app).get("/api/goals");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get a goal by id", async () => {
      const res = await request(app).get("/api/goals/1");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get all completed goals", async () => {
      const res = await request(app).get("/api/goals/completed");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get all incompleted goals", async () => {
      const res = await request(app).get("/api/goals/incompleted");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  });

  // *Passed
  describe("POST /api/goals/", () => {
    it("should create a new goal", async () => {
      const newGoalPayload = {
        id: Math.floor(Math.random() * 100),
        name: "Create Goal with Testing",
        start_date: "15/07/25",
        end_date: "25/11/25",
        completed: true,
      };

      const res = await request(app).post("/api/goals").send(newGoalPayload);

      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
    });
  });

  // !Failing
  describe("PUT /api/goals/", () => {
    it("should update an existing goal by id", async () => {
      const updateGoalPayload = {
        name: "Update Goal with Testing",
        start_date: "15/07/25",
        end_date: "25/11/25",
        completed: true,
      };

      const res = await request(app)
        .put("/api/goals/7")
        .send(updateGoalPayload)
        .expect(200)
        .expect("Content-Type", /json/);
    });
    // !Fix: This tests erases all of goals.jsonr records
    it.skip("should mark as complete an existing goal by id", async () => {
      const res = await request(app).put("/api/goals/complete/6").expect(200);
    });

    it.skip("should mark as complete an existing goal by id", async () => {
      const res = await request(app).put("/api/goals/incomplete/6").expect(200);
    });
  });

  // !Failing
  describe("DELETE /api/goals/", () => {
    it("should delete an existing goal by ID", async () => {
      const res = await request(app).delete("/api/goals/9").expect(200);
    });
  });
});
