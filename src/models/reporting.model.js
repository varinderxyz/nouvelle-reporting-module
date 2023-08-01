const mongoose = require('mongoose');
//  const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const { omit, pick } = require('lodash');
// const { roles } = require('../config/roles');

const reportingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  reportingItems: {
    type: mongoose.Schema.Types.Mixed,
  },
});

reportingSchema.set('timestamps', true);
const Reporting = mongoose.model('Reporting', reportingSchema);
module.exports = Reporting;
