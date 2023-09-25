const {Balance, Investor} = require('../models')
const midtransClient = require('midtrans-client');
class TransactionController{
    static async addTotaltransaction(req, res, next) {
    try {
      const balance = parseInt(req.body.balance);
      if (!balance) {
        return res
          .status(400)
          .json({ message: 'balance must be positif number' });
      }
      const dataFind = await Investor.findByPk(req.params.investorId);
      if (!dataFind) {
        throw { name: 'not_found' };
      } else {
        const data = await Investor.increment(
          { balance: balance },
          { where: { id: dataFind.id } }
        );
        if (!data[0]) {
          return res.status(200).json({ message: 'no data updated' });
        } else {
          const dataUpdated = await Investor.findOne({
            where: { id: req.params.investorId },
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
  static async minTotalTransaction(req, res, next) {
    try {
      const balance = parseInt(req.body.balance);
      if (!balance) {
        return res
          .status(400)
          .json({ message: 'balance must be positif number' });
      }
      const dataFind = await Investor.findByPk(req.params.investorId);
      if (!dataFind) {
        throw { name: 'not_found' };
      } else {
        const data = await Investor.increment(
          { balance: -balance },
          { where: { id: dataFind.id } }
        );
        if (!data[0]) {
          return res.status(200).json({ message: 'no data updated' });
        } else {
          const dataUpdated = await Investor.findOne({
            where: { id: req.params.investorId },
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
  static async midtransToken(req, res, next) {
    try {
      const { total, username } = req.body;
      if (!total) {
        return res.status(400).json({ message: 'total is required' });
      } else if (!username) {
        return res.status(400).json({ message: 'username is required' });
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

module.exports = TransactionController