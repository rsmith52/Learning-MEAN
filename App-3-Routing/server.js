console.log('test log');

// Load the express package and create app
var express = require('express');
var app = express();
var path = require('path');

// Send our index.html file to the user for the home page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Create routes for admin section

// Get an instance of the router
var adminRouter = express.Router();

/* MIDDLEWARE */

// Route middleware that will happen on every request
adminRouter.use(function(req, res, next) {

  // Log each request to the console
  console.log(req.method, req.url);

  // Continue doing what we were doing and go to the route
  next();
});

// Route middleware for parameters
adminRouter.param('name', function(req, res, next, name) {
  // Do validation on name here
  // Log something to know it works
  console.log('doing some name validations on ' + name);

  // Once validation is done save the new item in the req
  req.name = name;

  // Go to the next thing
  next();
})

/* ROUTES */

// Admin main page. The dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res) {
  res.send('I am the dashboard!');
});

// Users page (https://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
  res.send('I show all the users!');
});

// Individual user pages (https://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, res) {
//  res.send('Hello ' + req.params.name + '!');
  // Replaced above line after adding validation on name
  res.send('Hello ' + req.name + '!');
});

// Posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts!');
});

// Apply the routes to our application
app.use('/admin', adminRouter);

/* LOGIN ROUTE */

app.route('/login')
  // Show the form (GET http://localhost:1337/login)
  .get(function(req, res) {
    res.send('this is the login form');
  })

  // Process the form (POST http://localhost:1337/login)
  .post(function(req, res) {
    console.log('processing');
    res.send('processing the login form!');
  });

/* START SERVER */

// Start the server
app.listen(1337);
console.log('1337 is the magic port!');
