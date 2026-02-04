const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router(); //middleware.

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

/** Note that all route handlers was exported as an object. So to use them here
 * tourController.function
 */
