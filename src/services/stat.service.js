// const httpStatus = require('http-status');
// const { pick } = require('lodash');
// const moment = require('moment');
// const AppError = require('../utils/AppError');
const { Stat } = require('../models');

/**
 * Create a stat resource
 * @param {Object} statBody
 */

const createStat = async statBody => {
  const stat = await Stat.create(statBody);
  return stat;
};

/**
 * get all stats.
 * @param {Object} filter
 */

const getStats = async filter => {
  const stats = await Stat.find(filter);
  return stats;
};

/**
 * delete all stats.
 */

const deleteStats = async () => {
  const stats = await Stat.find();
  stats.forEach(stat => {
    stat.remove();
  });
  return 'stats removed';
};

module.exports = {
  createStat,
  getStats,
  deleteStats,
};
