const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zainali:2015Ag55rehan3@cluster0.rlj2s.mongodb.net/gsas?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.error(err.message);
    // Exit process with failure: "1" is failure code, while "0" is normal exit code
    process.exit(1);
  }
};

connectDB();

mongoose.connection.on("connected", async () => {
  const newsSchema = mongoose.Schema(
    {
      test: String,
    },
    { collection: "news" }
  );

  const News = mongoose.model("New", newsSchema);

  const res = await News.insertMany({ test: "abc" });

  console.log(res);
});

module.exports = { connectDB };
