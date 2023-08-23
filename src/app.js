const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 8000;

//static page path
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

//setting up view engine
const viewPath = path.join(__dirname, "../templates/views")
app.set("view engine", "hbs");
app.set("views", viewPath);

//setting up partials
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/weather", (req, res) => {
    res.render("weather")
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("*", (req, res) => {
    res.render("404error", {
        errorMsg: "Oops! Page not found!"
    });
})

app.listen(port, () => console.log(`listening to ${port}...`));