

// -------------------------
// Require Statements
// -------------------------

const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Log = require('./models/Log');
const methodOverride = require('method-override');

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
  // Method Override
  // -------------------------
  
  app.use(methodOverride('_method'));

// -------------------------
// Routes
// -------------------------
app.get('/', (req, res) => {
  res.render('logs/Index') 
 });

//  app.get('/create', (req, res) => {
//   res.render('received') 
//  });
// New
app.get('/logs/new', (req, res) => {
  res.render('logs/New');
  console.log('Make a New Log Form Page')
});
 // -------------------------
// Create
// -------------------------

 

app.post('/logs', (req, res) => {
  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.create(req.body, (error, createdLog) => {
    res.redirect('/logs')
  //   res.redirect('/logs/Show')
    console.log('Log Created')

  })
});

 // -------------------------
// Show
// -------------------------

app.get('/logs/:id', (req, res)=>{
  Log.findOne({_id: req.params.id},(error, foundLog)=>{
    res.render('logs/Show',{
      log: foundLog
    });
  });
});

app.get('/logs', (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render('logs/Index', {
      logs: allLogs
    });
    console.log('Log Index Page')

  })
});

// Update

app.put('/edit/log/:id', (req, res) => {
  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true
  } else {
    req.body.shipIsBroken = false
  }
  Log.updateOne({
    _id: req.params.id
  }, req.body, (error, data) => {
    if (error) {
      console.error(error);
      res.json({
        error: error
      });
    } else {
      res.redirect(`/logs`);
      console.log('Log Updated')
    }
  });
});
app.get('/edit/:id', (req, res) => {
  Log.findOne({ _id: req.params.id }, (error, foundLog) => {
    res.render('logs/Edit', {
      log: foundLog
    });
    console.log('Edit Log Page')
  });
});
// // Delete

app.delete('/delete/:id', (req, res) => {
  Log.deleteOne({
    _id: req.params.id
  }, (error, data) => {
    console.log(data);
    res.redirect('/logs');
    console.log('Log Deleted')
  })
});


// -------------------------
// App Is Listening Thing
// -------------------------

app.listen(3000, () => {
  console.log('listening on port 3000');
});


