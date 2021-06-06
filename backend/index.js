const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const configs = {
  clientPath: "client/build",
  forceHttps: true,
  port: process.env.PORT || 5000,
};

if (configs.forceHttps && process.env.NODE_ENVIRONMENT === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] == "http")
      res.redirect(`https://${req.headers.host}${req.url}`);
    else next();
  });
}

// Rotas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/alarms", require("./routes/alarms"));
app.use("/api/classes", require("./routes/classes"));

// Serve client on production
if (process.env.NODE_ENVIRONMENT === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, configs.clientPath, "index.html"));
  });
}

app.listen(configs.port, async () => {
  console.log(
    `SimpleStudy listening at http://localhost:${configs.port}`
  );
});
