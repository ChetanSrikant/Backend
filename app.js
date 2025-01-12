const express = require("express");
const morgan = require('morgan')

const app = express();

const userModel = require('./models/user')

const dbConnection = require('./config/db')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

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

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async(req, res) => {
    
    const {username, email, password} = req.body;
    
    const New_user = await userModel.create({
        username:username,
        email:email,
        password:password
    })

    // res.send("data recieved")
    res.send(New_user)
    console.log(req.body);
})

app.post("/get-form-data", (req, res) => {
    console.log(req.body);
    res.send("data recieved")
});

app.get("/user-data", (req, res) => {
    userModel.find().then((users)=>{
        res.send(users)
    })
})

app.get("/update-user", async(req, res) => {
    await userModel.findOneAndUpdate({username:'chetan'}, {username: 'mr_awesome'})
    res.send('User updated')
})

app.get("/delete-user", async(req, res) => {
    await userModel.findOneAndDelete({username:'mr_awesome'})
    res.send('User deleted')
})

app.listen(3000);
