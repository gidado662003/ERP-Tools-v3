const express = require("express");
const allRoutes = require("./routes/api");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use("/uploads", express.static("public/uploads"));

// Apply CORS middleware BEFORE other middleware
app.use(cors(corsOptions));

// OR for development (allow all origins):
// app.use(cors());

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api", allRoutes);

module.exports = app;
