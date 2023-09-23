const {Farm} = require('../models')

async function authorizeDeleteFarm(req, res, next) {
  const { farmId } = req.params;

  try {
    const foundFarm = await Farm.findOne({ where: { id: farmId } });

    if (!foundFarm) {
      throw { name: "Farm Not Found" };
    }

    if (foundFarm.status === "verified") {
      return res.status(403).json({
        status:403,
        message:"Verified farms can only be deleted by contacting admin"
      })
    }

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = authorizeDeleteFarm