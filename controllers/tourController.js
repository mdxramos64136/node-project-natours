/** This is where the router handlers live
 * Instead of repeat functions to check the id, put that function in
 * the middleware
 *
 */
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

//middlware for an especific param: It will be the middleware function of the
// .params() in the tourRoutes
exports.checkID = (req, res, next, value) => {
  console.log(`Tour id = ${value}!`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    //console.log("I am checking the boddy...");
    return res.status(400).json({
      status: "fail",
      message: "Please inform the name and the price.",
    });
  }
  next(); // call the next middleware
};
/**************************** ROUTE HANDLERS ****************************/
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    reqestedAt: req.requestedTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getSingleTour = (req, res) => {
  const singleTour = tours.find((el) => el.id === +req.params.id);
  console.log(req.params);

  res.status(200).json({
    status: "success",
    params: req.params,
    result: singleTour,
  });
};
/****************************** POST ******************************/
exports.createTour = (req, res) => {
  console.log("From Postman", req.body);
  // get the id from the last obj and +1
  const newId = tours[tours.length - 1].id + 1;

  const newTour = { ...req.body, id: newId };
  //const newTour = Object.assign({ id: newId }, req.body);
  //push into the array
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
      console.log("New tour has been inserted");
    },
  );
};
/****************************** PATCH ******************************/
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "succsess",
    data: {
      tour: "<Updated tour here>",
    },
  });
};

exports.deleteTour = (req, res) => {
  const updatedTours = tours.filter((el) => el.id !== +req.params.id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      if (err) console.log(err);
    },
  );

  // status 204 (no content) = delete resquest
  //In this case we don't send any back back. Instead we jus send 'null.
  res.status(204).json({
    status: "succsess",
    data: null,
  });
};
