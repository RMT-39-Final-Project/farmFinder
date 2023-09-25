const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");

let access_token_investor = "";

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert("Investors", [
    {
      username: "John Doe",
      email: "invest@mail.com",
      password: hash("testing"),
      phoneNumber: "07142421424",
      balance: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await sequelize.queryInterface.bulkInsert("Balances", [
    {
      balance: 100000,
      userId: 1,
      status: "success",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const responseInvestors = await request(app)
    .post("/users/investors/login")
    .send({
      email: "invest@mail.com",
      password: "testing",
    });

  access_token_investor = responseInvestors.body.access_token;
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Balances", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Investors", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /balances", () => {
  it("responds with status 200 when success get all balances", async () => {
    const response = await request(app).get("/balances");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /balances/:id", () => {
  it("responds with status 200 when success get balances by id", async () => {
    const response = await request(app)
      .get("/balances/1")
      .set("access_token", access_token_investor);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("balance");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("Investor");
    expect(response.body.Investor).toHaveProperty("username");
    expect(response.body.Investor).toHaveProperty("email");
    expect(response.body.Investor).toHaveProperty("phoneNumber");
    expect(response.body.Investor).toHaveProperty("balance");
  });
});

describe("POST /balances", () => {
  it("responds with status 201 when success post balances", async () => {
    const response = await request(app)
      .post("/balances")
      .send({
        userId: 1,
        balance: 100000,
        status: "success",
      })
      .set("access_token", access_token_investor);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("balance");
    expect(response.body).toHaveProperty("status");
  });

  it("responds with status 400 when userId is required/null", async () => {
    const response = await request(app)
      .post("/balances")
      .send({
        userId: null,
        balance: 100000,
        status: "success",
      })
      .set("access_token", access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "userId is required");
  });

  it("responds with status 400 when use same id", async () => {
    const response = await request(app)
      .post("/balances")
      .send({
        userId: 1,
        balance: 100000,
        status: "success",
      })
      .set("access_token", access_token_investor);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "id must be unique");
  });
});
