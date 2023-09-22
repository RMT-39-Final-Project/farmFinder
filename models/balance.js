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
        unique: {
          args: true,
          msg: 'userId must be unique',
        },
        validate: {
          notEmpty: { msg: 'userId is required' },
          notNull: { msg: 'userId is required' },
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
