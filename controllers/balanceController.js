const { Balance, Investor } = require('../models');
const midtransClient = require('midtrans-client');

class BalanceController {
  static async findAllBalance(req, res, next) {
    try {
      const data = await Balance.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model: Investor,
          attributes: { exclude: ['createdAt', 'updatedAt', "password"] },
        }
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async findBalance(req, res, next) {
    try {
      const data = await Balance.findOne({
        where: { id: req.params.balanceId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model: Investor,
          attributes: { exclude: ['createdAt', 'updatedAt', "password"] },
        }
      });
      if (!data) {
        throw { name: 'not_found' };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }
  static async createBalance(req, res, next) {
    try {
      const { id, userId, balance, status } = await Balance.create({
        ...req.body,
      });
      res.status(201).json({ id, userId, balance, status });
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusBalance(req, res, next) {
    try {
      if (!req.body.status) {
        return res.status(400).json('status is required');
      }
      const dataFind = await Balance.findByPk(req.params.balanceId);
      if (!dataFind) {
        throw { name: 'not_found' };
      } else {
        const data = await Balance.update(
          { status: req.body.status },
          { where: { id: dataFind.id } }
        );
        if (!data[0]) {
          return res.status(200).json({ message: 'no data updated' });
        } else {
          const dataUpdated = await Balance.findOne({
            where: { id: req.params.balanceId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          return res.status(200).json(dataUpdated);
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async addTotalBalance(req, res, next) {
    try {
      const balance = parseInt(req.body.balance);
      if (!balance) {
        return res
          .status(400)
          .json({ message: 'balance must be positif number' });
      }
      const dataFind = await Balance.findByPk(req.params.balanceId);
      if (!dataFind) {
        throw { name: 'not_found' };
      } else {
        const data = await Balance.increment(
          { balance: balance },
          { where: { id: dataFind.id } }
        );
        if (!data[0]) {
          return res.status(200).json({ message: 'no data updated' });
        } else {
          const dataUpdated = await Balance.findOne({
            where: { id: req.params.balanceId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          return res
            .status(200)
            .json({ message: 'success add balance', data: dataUpdated });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async minTotalBalance(req, res, next) {
    try {
      const balance = parseInt(req.body.balance);
      if (!balance) {
        return res
          .status(400)
          .json({ message: 'balance must be positif number' });
      }
      const dataFind = await Balance.findByPk(req.params.balanceId);
      if (!dataFind) {
        throw { name: 'not_found' };
      } else {
        const data = await Balance.increment(
          { balance: -balance },
          { where: { id: dataFind.id } }
        );
        if (!data[0]) {
          return res.status(200).json({ message: 'no data updated' });
        } else {
          const dataUpdated = await Balance.findOne({
            where: { id: req.params.balanceId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          return res
            .status(200)
            .json({ message: 'success add balance', data: dataUpdated });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteBalance(req, res, next) {
    try {
      const dataFind = await Balance.findOne({
        where: { id: req.params.balanceId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      if (!dataFind) {
        throw { name: 'not_found' };
      } else {
        const data = await Balance.destroy({ where: { id: dataFind.id } });
        if (!data) {
          return res.status(200).json({ message: 'deleting failed' });
        } else {
          return res.status(200).json({
            message: 'deleted balance success',
            data: dataFind,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async midtransToken(req, res, next) {
    try {
      const { total, username } = req.body;
      if (!total) {
        return res.status(400).json({ message: 'total is require' });
      } else if (!username) {
        return res.status(400).json({ message: 'total is require' });
      }
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let unique = new Date();
      unique = unique.getTime();
      let parameter = {
        transaction_details: {
          order_id: `Transaction-${unique}`,
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username,
        },
      };
      const midransToken = await snap.createTransaction(parameter);
      res.status(201).json(midransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BalanceController;
