const httpStatus = require('http-status');
// const { pick } = require('lodash');
const moment = require('moment');
const AppError = require('../utils/AppError');
const { Reporting } = require('../models');
const { Stat } = require('../models');
// const { getQueryOptions } = require('../utils/service.util');

/**
 * Function to check if the reporting for given date exists.
 * @param {String} id
 * @param {String} date
 */

const checkDuplicateReporting = async (id, date) => {
  const reporting = await Reporting.findOne({ user_id: id, date });
  if (reporting) {
    throw new AppError(httpStatus.NOT_FOUND, 'reporting already exists');
  }
};

/**
 * Get Reporting based on the id of the reporting passed
 * @param {String} id
 */

const getReportingById = async id => {
  const reporting = await Reporting.findOne({ _id: id });
  if (!reporting) {
    throw new AppError(httpStatus.NOT_FOUND, 'Reporting not found');
  }
  return reporting;
};

/**
 * delete reporting of with id passed as param
 * @param {String} id
 */

const deleteReporting = async id => {
  const reporting = await getReportingById(id);
  await reporting.remove();
  return reporting;
};

/**
 * Create a reporting resource
 * @param {Object} reportingBody
 */

const createReporting = async reportingBody => {
  // Using moment to fill in the date specific data
  const date = moment().format('DD-MM-YYYY');
  const week = moment().week();
  const monthnumber = moment().month();
  const month = moment()
    .month(monthnumber)
    .format('MMMM');
  const year = moment().year();
  await checkDuplicateReporting(reportingBody.user_id, date);
  // Check if reporting already exists
  const report = reportingBody;
  report.date = date;
  report.week = week;
  report.month = month;
  report.year = year;
  const reporting = await Reporting.create(report);
  return reporting;
};

/**
 * get all reportings.we can also filter the reporting based on filter.
 * @param {Object} filter
 */

const getReportings = async filter => {
  const reportings = await Reporting.find(filter);
  // const options = getQueryOptions(filter);
  const stats = await Stat.find();
  const statObject = {};
  stats.forEach(stat => {
    statObject[`${stat.labelName}`] = '';
  });
  const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const datesArray = [];
  daysArray.forEach(item => {
    const emptyReportingObject = {};
    emptyReportingObject.reportingItems = statObject;
    emptyReportingObject.userId = filter.userId;
    const date = moment()
      .day(item)
      .week(filter.week)
      .toDate();
    const formatteddate = moment(date).format('DD-MM-YYYY');
    const week = moment(date).week();
    const monthnumber = moment(date).month();
    const month = moment(date)
      .month(monthnumber)
      .format('MMMM');
    const year = moment(date).year();
    emptyReportingObject.date = formatteddate;
    emptyReportingObject.week = week;
    emptyReportingObject.year = year;
    emptyReportingObject.month = month;
    datesArray.push(emptyReportingObject);
  });

  datesArray.forEach((item, index) => {
    reportings.forEach(report => {
      if (item.date === report.date) {
        datesArray[index] = report;
      }
    });
  });
  return datesArray;
};

/**
 * update a reporting based on id.
 * @param {String} id
 * @param {Object} updateBody
 */

const updateReporting = async updateBody => {
  const reporting = await Reporting.findOneAndUpdate({ userId: updateBody.userId, date: updateBody.date }, updateBody, {
    new: true,
    upsert: true,
  });
  return reporting;
};

/**
 * reporting Count.
 * @param {Object} filter
 */

const getReportingCount = async filter => {
  const reportings = await getReportings(filter);
  const stats = await Stat.find();
  const responseArray = [];
  reportings.forEach(reporting => {
    const reportingItemObject = reporting.reportingItems;
    const Keys = Object.keys(reportingItemObject);
    for (let i = 0; i < Keys.length; i += 1) {
      // finding the Keys of reporting
      const statItem = stats.find(stat => stat.labelName === Keys[i]);
      const rangeValues = statItem.rangeValues;
      const reportingItemValue = reportingItemObject[Keys[i]]
        .toLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
      const rangeObject = rangeValues.find(range => range.label === reportingItemValue);
      if (rangeObject !== undefined) {
        const rangeValuesLength = rangeValues.length;
        const labelAverage = rangeObject.range / rangeValuesLength;
        // Check if response array already contains that item
        // object for each reporting item for eg reporting
        // if the item is present find that item.if not insert item;
        const itemExists = responseArray.some(item => item.item === Keys[i]);
        if (!itemExists) {
          const reportingItemCountObject = {};
          reportingItemCountObject.item = Keys[i];
          reportingItemCountObject.count = 1;
          reportingItemCountObject.totalAdditionVal = labelAverage;
          reportingItemCountObject.average =
            (reportingItemCountObject.totalAdditionVal / reportingItemCountObject.count) * 100;
          responseArray.push(reportingItemCountObject);
        } else {
          const reportingItemObjectToUpdate = responseArray.find(item => item.item === Keys[i]);
          reportingItemObjectToUpdate.count += 1;
          reportingItemObjectToUpdate.totalAdditionVal += labelAverage;
          reportingItemObjectToUpdate.average =
            (reportingItemObjectToUpdate.totalAdditionVal / reportingItemObjectToUpdate.count) * 100;
        }
      }
    }
  });
  return responseArray;
};

module.exports = {
  createReporting,
  getReportings,
  updateReporting,
  deleteReporting,
  getReportingCount,
};
