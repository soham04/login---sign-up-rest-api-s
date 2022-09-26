const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const User = require('./models/user');

const app = express();
// app use
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// database connection
mongoose.Promise = global.Promise;

async function main() {
  await mongoose.connect(
      'mongodb+srv://soham:soham@cluster0.dfruy.mongodb.net/?retryWrites=true&w=majority');
  console.log('Connected to mongoDB');
}

main()

// register new user (sign-up route)
app.post('/api/register', async function(req, res) {
  // taking a user
  const newuser = new User({email: req.body.email, phone: req.body.phone});
  console.log('hi' + newuser);

  User.findOne({email: newuser.email}, function(err, user) {
    if (user)
      return res.status(400).json({auth: false, message: 'email exits'});

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({message: 'internal server error'});
      }
      res.status(200).json({succes: true, user: doc});
    });
  });
});


// login user
app.post('/api/login', async function(req, res) {
  console.log('hi');
  console.log(req.body.phone);
  User.findOne({phone: req.body.phone}, function(err, user) {
    // console.log(user);
    if (!user) {
      return res.status(401).json(
          {isAuth: false, message: ' Auth failed ,phone not found'});
    } else {
      return res.status(200).json(
          {isAuth: true, message: ' User Authenticated'});
    }
  });
});

app.get('/', function(req, res) {
  res.status(200).send(`Welcome to Login and Register API`);
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});