const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const port = 3000;
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors());
app.use(router);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

