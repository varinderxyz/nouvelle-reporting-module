const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { statService } = require('../services');

/**
 *  Create Stat Resource.
 */

const createStat = catchAsync(async (req, res) => {
  const stat = await statService.createStat(req.body);
  res.status(httpStatus.CREATED).send(stat);
});

/**
 * Get All reporting Resources.
 */

const getStats = catchAsync(async (req, res) => {
  const filter = req.query;
  const stats = await statService.getStats(filter);
  res.send(stats);
});

/**
 * Get All reporting Resources.
 */

const deleteStats = catchAsync(async (req, res) => {
  const response = await statService.deleteStats();
  res.send(response);
});

module.exports = {
  createStat,
  getStats,
  deleteStats,
};
