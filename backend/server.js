const colors = require("colors");
const app = require("./app");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.underline.red);
  console.log(
    `shutting down the server for handling uncaught exception`.underline.red
  );
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    colors.rainbow(`Server is running on http://localhost:${process.env.PORT}`)
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`.underline.red);
  console.log(
    `shutting down the server for unhandled promise rejection`.underline.red
  );

  server.close(() => {
    process.exit(1);
  });
});
