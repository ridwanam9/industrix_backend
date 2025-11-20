const request = require("supertest");
const app = require("../app");
const { sequelize, Category } = require("../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Categories API", () => {
  let categoryId;

  test("POST /api/categories - create category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: "Work",
      color: "#3B82F6"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Work");

    categoryId = res.body.id;
  });

  test("GET /api/categories - list categories", async () => {
    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("DELETE /api/categories/:id - delete category", async () => {
    const res = await request(app).delete(`/api/categories/${categoryId}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Category deleted");
  });
});
