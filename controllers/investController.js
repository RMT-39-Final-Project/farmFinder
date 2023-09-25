const { Invest, Investor } = require("../models");

class InvestController {
  static async getInvest(req, res, next) {
    try {
      const invest = await Invest.findAll();

      res.status(200).json(invest);
    } catch (error) {
      next(error);
    }
  }

  static async getInvestById(req, res, next) {
    try {
      const investDetail = await Invest.findByPk(req.params.id);
      if (!investDetail) {
        throw { name: "invest_not_found", id: req.params.id };
      }

      res.status(200).json(investDetail);
    } catch (error) {
      next(error);
    }
  }

  static async postInvest(req, res, next) {
    try {
      let { ownership, totalPrice } = req.body;

      const { balance } = await Investor.findByPk(req.investor.id);

      if (balance >= req.body.totalPrice) {
        const data = await Invest.create({
          status: "success",
          ownership,
          totalPrice,
        });
        res.status(201).json(data);
      } else {
        const data = await Invest.create({
          status: "failed",
          ownership,
          totalPrice,
        });
        res.status(201).json(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

// module.exports = InvestController;
