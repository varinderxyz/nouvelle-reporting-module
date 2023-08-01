const mongoose = require('mongoose');
//  const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const { omit, pick } = require('lodash');
// const { roles } = require('../config/roles');

const statSchema = mongoose.Schema({
  labelName: {
    type: String,
    required: true,
  },
  labelType: {
    type: String,
    enum: ['Punctuality', 'Attitude', 'Skills', 'Efficiency', 'Sincerity'],
    required: true,
  },
  labelRange: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  rangeValues: [
    {
      range: Number,
      label: String,
    },
  ],
});

statSchema.set('timestamps', true);
const Stat = mongoose.model('Stat', statSchema);
module.exports = Stat;
