const request = require("supertest");
const app = require("../app");
const { sequelize, Todo } = require("../models");

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close();
});

describe("Todos API", () => {
  let todoId;

  test("POST /api/todos - create todo", async () => {
    const res = await request(app).post("/api/todos").send({
      title: "Test Todo",
      description: "Test desc",
      priority: "high"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Todo");

    todoId = res.body.id;
  });

  test("GET /api/todos - list todos", async () => {
    const res = await request(app).get("/api/todos");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  test("PUT /api/todos/:id - update todo", async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ title: "Updated title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated title");
  });

  test("PATCH /api/todos/:id/complete - toggle complete", async () => {
    const res = await request(app).patch(`/api/todos/${todoId}/complete`);

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test("DELETE /api/todos/:id - delete todo", async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Todo deleted");
  });
});
