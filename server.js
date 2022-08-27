const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turns on routes
app.use(routes);

// turns on connection to database and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});