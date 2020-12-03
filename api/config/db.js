const mongoose = require('mongoose');
const mongoURI = require('./default.json').mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure: "1" is failure code, while "0" is normal exit code
    process.exit(1);
  }
};

module.exports = { connectDB };
