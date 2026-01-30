/**
 * Notes and explanations in the app.txt file.
 * It's a good practice start with the core modules
 * */
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
});

app.post("/api/v1/tours", (req, res) => {
  //console.log(req.body); // from server to client?
  // get the id from the last obj and +1
  const newId = tours[tours.length - 1].id + 1;

  const newTour = { id: newId, ...req.body };
  //const newTour = Object.assign({ id: newId }, req.body);
  //push into the array
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        data: "success",
        data: {
          tour: newTour,
        },
      });
    },
  );

  //Persist data. Write to a file:
  // res.send("Done"); //from client to server?
});

//set/ start a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
