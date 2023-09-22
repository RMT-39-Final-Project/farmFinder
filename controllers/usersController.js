const { compare } = require("../helpers/bcrypt");
const { token } = require("../helpers/jwt");
const { Investor, Farmer } = require("../models");
class UserController {
  static async findInvestor(req, res, next) {
    try {
      const data = await Investor.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async findOneInvestor(req, res, next) {
    try {
      const data = await Investor.findByPk(req.params.id);
      if (!data) throw { name: "investor_not_found", id: req.params.id };
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async createInvestor(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const data = await Investor.create({
        username,
        email,
        password,
        phoneNumber,
      });
      const access_token = token({ id: data.id });
      res.status(201).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async loginInvestor(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "email/password_required" };
      if (!password) throw { name: "email/password_required" };
      const user = await Investor.findOne({ where: { email } });
      if (!user) throw { name: "invalid_email/password" };
      const valid = compare(password, user.password);
      if (!valid) throw { name: "invalid_email/password" };
      const access_token = token({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
