const mongoose = require("mongoose");

if (process.env.NODE_ENV.toLowerCase() === "development") {
  mongoose.set("debug", true);
}

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection succesful"))
  .catch((e) => console.error(e));

const TodoSchema = new mongoose.Schema(
  {
    gCalendarId: { type: String, required: true },
    todo: { type: String, required: "Provided a valid todo", trim: true },
    files: Array,
  },
  { timestamps: true }
);

module.exports.Todos = mongoose.model("Todos", TodoSchema);
