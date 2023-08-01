const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reportingService } = require('../services');

/**
 *  Create Reporting Resource.
 */

const createReporting = catchAsync(async (req, res) => {
  const reporting = await reportingService.createReporting(req.body);
  res.status(httpStatus.CREATED).send(reporting);
});

/**
 * Get All reporting Resources.
 */

const getReportings = catchAsync(async (req, res) => {
  const filter = req.query;
  const reportings = await reportingService.getReportings(filter);
  res.send(reportings);
});

/**
 * Update a reporting Resource.
 */

const updateReporting = catchAsync(async (req, res) => {
  const report = await reportingService.updateReporting(req.body);
  res.send(report);
});

/**
 * Remove a Resourse.
 */

const deleteReporting = catchAsync(async (req, res) => {
  await reportingService.deleteReporting(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Remove a Resourse.
 */

const getReportingCount = catchAsync(async (req, res) => {
  const filter = req.query;
  const response = await reportingService.getReportingCount(filter);
  res.send(response);
});

module.exports = {
  createReporting,
  getReportings,
  updateReporting,
  deleteReporting,
  getReportingCount,
};
