require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

// Routes
app.use("/api/v1", require("./routes/todos.route"));

// 404
app.use((req, res) => {
  res
    .status(404)
    .json({ status: 404, errCode: "NOT_FOUND", message: "Route not found" });
});

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
