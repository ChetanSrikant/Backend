const express = require("express");
const morgan = require('morgan')

const app = express();

app.use(morgan('dev'))

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log('Middleware 1');

    const a = 1;
    const b = 2;

    console.log(a + b);

    return next();
})

app.get("/", (req,res,next)=>{
    const a=5;
    const b=10;
    console.log(a+b);
    next();
}, (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/profile", (req, res) => {
  res.send("Profile Page");
});

app.listen(3000);
