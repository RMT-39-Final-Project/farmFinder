const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

// beforeAll(async () => {
//   let invest = require("../data/invest.json");
//   await sequelize.queryInterface.bulkInsert("Invests", invest);
// });

// afterAll(async () => {
//   await sequelize.queryInterface.bulkDelete("Invests", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
// });

// describe("GET /invests", () => {
//   it("responds with status 200 when success get invests", async () => {
//     const response = await request(app).get("/invests");
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("invests");
//   });
// });

// describe("POST /invests", () => {
//   it("responds with status 201 when success post invests", async () => {
//     const response = await request(app).post("/invests").send({
//       status: "success",
//       ownership,
//       totalPrice,
//     });
//     expect(response.status).toBe(201);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("status");
//     expect(response.body).toHaveProperty("ownership");
//     expect(response.body).toHaveProperty("totalPrice");
//   });
// });

// describe("GET /invests/:id", () => {
//   it("responds with status 200 when success get invests by id", async () => {
//     const response = await request(app).get("/invests/:id");
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("invests");
//   });
// });