const { Invest, Investor, Farm } = require("../models");

class InvestController {
  static async getInvest(req, res, next) {
    try {
      const invest = await Invest.findAll({
        where: { investorId: req.investor.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Farm,
            attributes: ["name"],
          },
        ],
      });

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
      let { ownership, totalPrice, farmId } = req.body;

      const { balance } = await Investor.findByPk(req.params.id);

      if (balance >= req.body.totalPrice) {
        const data = await Invest.create({
          status: "success",
          ownership,
          totalPrice,
          farmId,
          investorId: req.investor.id,
        });
        res.status(201).json(data);
      } else {
        throw {
          name: "failed",
          status: "failed",
          ownership,
          totalPrice,
          farmId,
          investorId: req.investor.id,
        };
      }
    } catch (error) {
      if (error.name === "failed") {
        const data = {
          status: "failed",
          ownership: error.ownership,
          totalPrice: error.totalPrice,
          farmId: error.farmId,
          investorId: req.investor.id,
        };
        return res.status(400).json(data);
      } else {
        next(error);
      }
    }
  }

  static async getInvestByFarmId(req, res, next) {
    try {
      const { farmId } = req.params;
      const invests = await Invest.findAll({
        where: {
          farmId: farmId,
        },
        include: [
          {
            model: Investor,
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["createdAt", "ASC"]],
      });
      if (!invests) throw { name: "InvalidFarmId" };
      if (invests) {
        res.status(200).json(invests);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = InvestController;
