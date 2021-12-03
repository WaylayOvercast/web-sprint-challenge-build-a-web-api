// Write your "projects" router here!
const express = require('express');
const actionsRouter = require('../actions/actions-router')
const {
    reqProjects,
    reqProjectById,
    reqCreateProj,
    reqUpdateProj,
    reqRemoveProj,
    reqGetActions
  } = require('./projects-middleware');

const router = express.Router();

  
  //im leaving the routers to only handle unknown errors and hardcoding log info, 
  //could make a logger or function to do it but its not so much work as a convention
  router.use('/actions', actionsRouter);

  router.get('/', reqProjects, (req, res, next) =>{
    res.status(500).json(`unexplained server error - no projects found`)
    console.log(`Server GET Failure @project-router-line-13`)
  });

  router.get('/:id', reqProjectById, (req, res, next) =>{
    res.status(500).json(`unexplained server error - no project found`)
    console.log(`Server GET Failure @project-router-line-18`)
  });
  
  router.post('/', reqCreateProj, (req, res, next) =>{
    res.status(500).json(`unexplained server error - project POST Failure`)
    console.log(`Server POST Failure @project-router-line-23`)
  });

  router.put('/:id', reqUpdateProj, (req, res, next) =>{
    res.status(500).json(`unexplained server error - project PUT Failure`)
    console.log(`Server PUT Failure @project-router-line-28`)
  });

  router.delete('/:id', reqRemoveProj, (req, res, next) =>{
      res.status(500).json(`unexplained server error - project DELETE Failure`)
      console.log(`Server DELETE Failure @project-router-line-37`)
  });
  
  router.get('/:id/actions', reqGetActions, (req, res, next) => {
    res.status(500).json(`unexplained server error - no projects found`)
    console.log(`Server GET Failure @project-router-line-45`)
  });
      
  module.exports = router