const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createReporting = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    reportingItems: Joi.object().required(),
  }),
};

const getReportings = {
  query: Joi.object().keys({
    _id: Joi.string().custom(objectId),
    reporting_items: Joi.object(),
    userId: Joi.string().custom(objectId),
    date: Joi.string(),
    week: Joi.number(),
    month: Joi.string(),
    year: Joi.number(),
  }),
};

const updateReporting = {
  body: Joi.object().keys({
    reportingItems: Joi.object(),
    userId: Joi.string().custom(objectId),
    date: Joi.string(),
    week: Joi.number(),
    year: Joi.number(),
    month: Joi.string(),
  }),
};

const deleteReporting = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReporting,
  getReportings,
  updateReporting,
  deleteReporting,
};
