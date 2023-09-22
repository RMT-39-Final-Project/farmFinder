const express = require("express");
const ReportController = require("../controllers/reportController");
const report = express.Router();

report.get("/", ReportController.getReport);
report.post("/", ReportController.postReport);
report.get("/:id", ReportController.getReportById);

module.exports = report;
