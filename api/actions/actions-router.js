// Write your "actions" router here!
const express = require('express');
const {
  getActions, 
  getActionsById,
  createAction,
  updateAction,
  removeAction

}= require('./actions-middlware');


  const actionRouter = express.Router();


 

  actionRouter.get('/', getActions, (req, res, next) =>{
    res.status(500).json(`unexplained server error - no actions found`)
    console.log(`Server GET Failure @actions-router-line-13`)
  });

  actionRouter.get('/:id', getActionsById, (req, res, next) =>{
    res.status(500).json(`unexplained server error - no actions found`)
    console.log(`Server GET Failure @actions-router-line-19`)
  });

  actionRouter.post('/', createAction, (req, res, next) =>{
    res.status(500).json(`unexplained server error - no action created`)
    console.log(`Server POST Failure @actions-router-line-25`)
  });

  actionRouter.put('/:id', updateAction, (req, res, next) =>{
    res.status(500).json(`unexplained server error - action not updated`)
    console.log(`Server PUT Failure @actions-router-line-32`)
  });

  actionRouter.delete('/:id', removeAction, (req, res, next) =>{
    res.status(500).json(`unexplained server error - action not deleted`)
    console.log(`Server DELETE Failure @actions-router-line-37`)
  });

  module.exports = actionRouter 