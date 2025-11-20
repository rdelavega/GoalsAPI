import request from "supertest";
import express from "express";
import { Router } from "express";
import { expect } from "chai";
import { describe, it } from "mocha";
import generateGoalPayload from "./helpers/generateGoalPayload.js";
import sinon from "sinon";
import { goalsController } from "../src/controllers/goals.controller.js";

// TODO: refactor tests suites with database
describe("API CRUD operations", () => {
  const fakeQuery = {
    query: sinon.stub().resolves({
      rows: [
        {
          goal_id: 1,
          goal_name: "Test Goal",
          goal_category: "Testing",
          start_date: "12/12/25",
          end_date: "13/12/25",
          complete: false,
        },
        {
          goal_id: 2,
          goal_name: "Test Goal #2",
          goal_category: "Testing",
          start_date: "13/12/25",
          end_date: "23/12/25",
          complete: true,
        },
      ],
    }),
  };

  const controller = goalsController({ query: fakeQuery.query });
  const app = express();
  const router = Router();

  router.get("/goals", controller.getGoals);
  app.use("/api", router);
  describe("GET /api/goals/", () => {
    it("should get all goals", async () => {
      const res = await request(app).get("/api/goals");
      expect(res.status).to.equal(200);
    });

    it.skip("should get goals by page and limit", async () => {
      const res = await request(app).get("/api/goals?page=1&limit=10");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should find a goal by id", async () => {
      const res = await request(app).get("/api/goals/2");
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
      const newGoal = await generateGoalPayload();

      const res = await request(app).post("/api/goals").send(newGoal);

      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
    });
  });
  describe("PUT /api/goals/", () => {
    it.skip("should update an existing goal by id", async () => {
      const updateGoalPayload = {
        goal_name: "Update Goal with Testing",
        goal_category: "Programming",
        start_date: "15/07/25",
        end_date: "25/11/25",
        complete: true,
      };

      const res = await request(app)
        .put(`/api/goals/1`)
        .send(updateGoalPayload)
        .expect(200);
    });

    it.skip("should mark as complete an existing goal by id", async () => {
      const res = await request(app)
        .put(`/api/goals/1/validate?q=complete`)
        .expect(200);
    });

    it.skip("should mark as incomplete an existing goal by id", async () => {
      const res = await request(app)
        .put(`/api/goals/2/validate?q=incomplete`)
        .expect(200);
    });
  });

  // ? Passing, test edge cases
  describe("DELETE /api/goals/", () => {
    it.skip("should delete an existing goal by ID", async () => {
      const res = await request(app).delete(`/api/goals/1`).expect(204);
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
