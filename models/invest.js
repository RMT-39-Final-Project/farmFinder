"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invest.belongsTo(models.Farm, { foreignKey: "farmId" });
      Invest.belongsTo(models.Investor, { foreignKey: "investorId" });
    }
  }
  Invest.init(
    {
      status: DataTypes.STRING,
      ownership: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      investorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invest",
    }
  );
  return Invest;
};
