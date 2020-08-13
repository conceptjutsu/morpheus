const express = require('express');
const leadsController = require('../controllers/leads');

const router = express.Router();

// router.param('id', leadsController.checkID);
router.route('/lead-stats').get(leadsController.getLeadStats);
router.route('/monthly-report').get(leadsController.getMonthlyReport);

router
  .route('/')
  .get(leadsController.getAllLeads)
  .post(leadsController.createLead);

router
  .route('/:id')
  .get(leadsController.getLead)
  .patch(leadsController.updateLead)
  .delete(leadsController.deleteLead);

module.exports = router;
