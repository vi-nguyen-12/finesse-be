const express = require("express");
const app = express();
const socket = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const productRoute = require("./routes/productRoute");

const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(function (req, res, next) {
  if (!req.headers["x-forwarded-proto"]) {
    req.headers["x-forwarded-proto"] = `${req.protocol}`;
  }
  return next();
});
let allowedDomains = [];

if (process.env.NODE_ENV === "test") {
  allowedDomains = [process.env.DEV_CLIENT_URL, process.env.TEST_CLIENT_URL];

  const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      if (allowedDomains.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
}

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

app.use(express.json());
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "*");
  next();
});

app.use("/api/products", productRoute);

const server = app.listen(port, () => console.log("Server is running..."));

const io = socket(server, {
  cors: {
    credentials: true,
    origin: [process.env.DEV_CLIENT_URL, process.env.TEST_CLIENT_URL],
  },
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});
