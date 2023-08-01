const express = require('express');
const validate = require('../../middlewares/validate');
const reportingController = require('../../controllers/reporting.controller');
const reportingValidation = require('../../validations/reporting.validation');

const router = express.Router();

// Add Reporting and Get all reportings route.
router
  .route('/')
  .post(validate(reportingValidation.createReporting), reportingController.createReporting)
  .get(validate(reportingValidation.getReportings), reportingController.getReportings);

// Update reporting.we pass reporting id as param.

router.route('/update').post(validate(reportingValidation.updateReporting), reportingController.updateReporting);

// Delete reporting.we pass reporting id as param.
router.route('/:id').delete(validate(reportingValidation.deleteReporting), reportingController.deleteReporting);

// Delete reporting.we pass reporting id as param.
router.route('/get-reporting-count').get(reportingController.getReportingCount);

module.exports = router;
