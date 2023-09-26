const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helpers/bcrypt");

beforeAll(async () => {
  let farm = require("../data/farm.json");
  let invest = require("../data/invest.json");
  await sequelize.queryInterface.bulkInsert("Farmers", [
    {
      username: "Waryo",
      email: "waryo@mail.com",
      password: hash("waryo"),
      phoneNumber: "0813234344",
      status: "Active",
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "Tarmudi",
      email: "tarmudi@mail.com",
      password: hash("tarmudi"),
      phoneNumber: "0817934344",
      status: "Active",
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "Jono",
      email: "jono@mail.com",
      password: hash("jono"),
      phoneNumber: "08170974344",
      status: "Active",
      balance: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

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

  farm = farm.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Farms", farm);

  invest = invest.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Invests", invest);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Invests", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Farms", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Investors", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Farmers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /invests", () => {
  it("responds with status 200 when success get invests", async () => {
    const response = await request(app).get("/invests");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("POST /invests", () => {
  it("responds with status 201 when success post invests", async () => {
    const response = await request(app).post("/invests").send({
      status: "success",
      ownership: 1,
      totalPrice: 100,
      farmId: 1,
      investorId: 1
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("ownership");
    expect(response.body).toHaveProperty("totalPrice");
    expect(response.body).toHaveProperty("farmId");
    expect(response.body).toHaveProperty("investorId");
  });
});

describe("GET /invests/:id", () => {
  it("responds with status 200 when success get invests by id", async () => {
    const response = await request(app).get("/invests/:id");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("invests");
  });
});
