

// -------------------------
// Require Statements
// -------------------------

const express = require('express');
const app = express();
// const fruits = require('./models/fruits');
// const veggies = require('./models/veggies');
require('dotenv').config();
const mongoose = require('mongoose');
const Log = require('./models/logs');
// const Fruit = require('./models/Fruit');

// -------------------------
// Mongoose Connection Stuff
// -------------------------

const mongoURI = process.env.MONGO_URI;
db = mongoose.connection;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('error', (error) => console.log(error.message + ' is mongod not running?'));
db.on('open', () => console.log('mongo connected: ', mongoURI));
db.on('close', () => console.log('mongo disconnected!'));


// -------------------------
// Setting Up View Engine
// -------------------------

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// -------------------------
// Setting Up Body Parser
// -------------------------

app.use(express.urlencoded({extended:false}));

// -------------------------
// Routes
// -------------------------
app.get('/', (req, res) => {
  res.render('Index') 
 });

 app.get('/create', (req, res) => {
  res.render('received') 
 });

 // -------------------------
// Create
// -------------------------

 app.post('/create', (req, res)=>{
  if(req.body.shipisbroken === 'on'){
    req.body.shipisbroken = true;
  } else{
    req.body.shipisbroken = false;
  }
  Log.create(req.body, (error, createdLog)=>{
    res.redirect('/logs')
  })
 })

 // -------------------------
// Show
// -------------------------

app.get('/logs/:id', (req, res)=>{
  Logs.findOne({_id: req.params.id},(error, foundLog)=>{
    res.render('logs/Show',{
      log: foundLog
    });
  });
});


// -------------------------
// App Is Listening Thing
// -------------------------

app.listen(3000, () => {
  console.log('listening on port 3000');
});