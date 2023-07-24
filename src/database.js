mongoose = require("mongoose");
MONGODB_URI = require('./config');

(async () => {
  try {
    db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("DB connected to", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
