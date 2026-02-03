/**
 * It's a good practice start with the core modules
 * */
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json()); //auto parse to json

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);
/****************************** GET ROUTES ******************************/
const getAllTours = () => (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

const getSingleTour = () => (req, res) => {
  const singleTour = tours.find((el) => el.id === +req.params.id);
  console.log(req.params);

  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    params: req.params,
    result: singleTour,
  });
};
/****************************** POST ******************************/
const createTour = () => (req, res) => {
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
const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id!",
    });
  }

  res.status(200).json({
    status: "succsess",
    data: {
      tour: "<Updated tour here>",
    },
  });
};

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id!",
    });
  }

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

//Route that can accept variable (:id)
// the param is a number in a string formar. Parse it to a number.
//Another way to convert is multiplying the value by a number:
//.const id = req.params.id * 1;

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getSingleTour)
  .patch(updateTour)
  .delete(deleteTour);

/************************* Start the server ************************/
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
