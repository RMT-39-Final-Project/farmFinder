"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Report.belongsTo(models.Farm, { foreignKey: "farmId" });
      // Report.belongsTo(models.Investor, { foreignKey: "investorId" });
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
