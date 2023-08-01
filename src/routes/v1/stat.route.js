const express = require('express');
// const validate = require('../../middlewares/validate');
const statController = require('../../controllers/stat.controller');
// const reportingValidation = require('../../validations/reporting.validation');

const router = express.Router();

// Add Reporting and Get all reportings route.
router
  .route('/')
  .post(statController.createStat)
  .get(statController.getStats);

router.route('/delete-all-stats').delete(statController.deleteStats);

module.exports = router;
