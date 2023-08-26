const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { init, getIO } = require("./config/socket");
const { CLIENT_URL } = require("./utils/variables");

// INIT App
const app = express();
const httpserver = http.createServer(app);
require("dotenv").config();

// INIT Database (Monoose)
require("./config/db");

// INIT Socket
init(httpserver);

// Set Middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: [CLIENT_URL] }));

// Handle routes
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/user/", require("./routes/user"));
app.use("/api/conversation/", require("./routes/conversation"));
app.use("/api/message/", require("./routes/message"));
app.use("/api/", require("./routes/shared"));

// Socket IO

getIO().on("connection", require("./controllers/realtime-socket"));

// Create Server
httpserver.listen(process.env.PORT || 3005, () => {
  console.log("Server start on port", process.env.PORT);
});
