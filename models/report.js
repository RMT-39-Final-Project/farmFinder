"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {

    static associate(models) {
      Report.belongsTo(models.Farm, { foreignKey: "farmId" });
      Report.belongsTo(models.Investor, { foreignKey: "investorId" });
    }
  }
  Report.init(
    {
      investorId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description cannot be empty",
          },
          notNull: {
            msg: "Description cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Report",
    }
  );
  return Report;
};
