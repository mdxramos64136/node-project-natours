const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router(); //middleware.

//middleware that runs only for an specified param. In this case, id.
//the second param of this method is the middleware function.
//val is the value of the param (id)
router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

/** Note that all route handlers was exported as an object. So to use them here
 * tourController.function
 */
