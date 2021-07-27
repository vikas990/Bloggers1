const mongoose = require("mongoose");

const dbUrl = process.env.DATABASEURL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected....");
  })
  .catch((err) => {
    console.log(err);
  });

// VwaX91fXoqvBg3YE
