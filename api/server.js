const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


//additional require()'s
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

//server.use()'s
server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


//api main page and info
server.get('/', (req, res) => {
  res.send(`<h1> Hey Gabe/ who ever ends up code reviewer! </h1>   <br>
  <h2> go to these endpoints for your beautiful data :) </h2>  <br>
  <a href =https://www.youtube.com/watch?v=7VkqerXVtTA>please enjoy reviewing my code with this</a> `);
});


module.exports = server;
