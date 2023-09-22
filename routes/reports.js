const express = require("express");
const ReportController = require("../controllers/reportController");
const report = express.Router();

report.get("/comments", ReportController.getReport);
report.post("/comments", ReportController.postReport);
report.get("/comments/:id", ReportController.getReportById);


module.exports = report;
