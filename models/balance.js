'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {

    static associate(models) {
      // this.belongsTo(models.User)
    }
  }
  Balance.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: 'userId is required',
          notNull: 'userId is required',
        },
        
      },
      balance: { type: DataTypes.INTEGER },
      status: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Balance',
    }
  );
  return Balance;
};
