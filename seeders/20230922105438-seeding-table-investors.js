"use strict";

const { hash } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Investors",
      [
        {
          id: 1,
          username: "John Doe",
          email: "invest@mail.com",
          password: hash("testing"),
          phoneNumber: "07142421424",
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Investors", null, {});
  },
};