const dotenv = require("dotenv");
// It is available in all files. It should come BEFORE the app file
dotenv.config({ path: "./config.env" });

const app = require("./app");

// checking the enviroment that we are currently in:
//console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
