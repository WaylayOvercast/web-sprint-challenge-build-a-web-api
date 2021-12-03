// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('./actions-model');

async function getActions (req, res, next) {
    try{
        const actions = await Actions.get()
        if(actions.length >= 0){
            next(res.status(200).json(actions))
        }else{
            next(res.status(404).json(actions))
        }
    
    }catch(err){
        console.log(`UNKNOWN ERROR - @getActions midware ${err}`)
        next()
    }
}

async function getActionsById (req, res, next) {
    try{
        const ID = req.params.id
        const action = await Actions.get(ID)
        if(!action){
            next(res.status(404).json(`NOT_FOUND - ID_GIVEN:${ID}`))
        }else{
            next(res.status(200).json(action))
        }
    }catch(err){
        console.log(`UNKNOWN ERROR - @getActionsById midware ${err}`)
        next()
    }
}

async function createAction (req, res, next) {
    try{
        
        if(!await Projects.get(req.body['project_id'])){
            next(res.status(404).json(`NOT FOUND - ID:${req.body['project_id']}`))

        }else if(req.body.notes && req.body.description && 'completed' in req.body){
            const newAction = await Actions.insert(req.body) 
            next(res.status(201).json(newAction))

        }else{
            next(res.status(400).json(`BAD REQUEST - body:${req.body} `))
            
        }
        
    }catch(err){
        console.log(`UNKNOWN ERROR - @createAction midware ${err}`)
        next()
    }
}

async function updateAction (req, res, next) {
    try{
        const ID = req.params.id
        const toUpdate = await Actions.get(ID)

        if(!toUpdate || !await Projects.get(req.body['project_id'])){
            next(res.status(404).json(`NOT_FOUND - ID_GIVEN:${ID}`))
                                                                            
        }if(req.body.notes && req.body.description && "completed" in req.body){ //making sure key is IN obj (very cool need to use this more  /nother song https://www.youtube.com/watch?v=XgL3RMNhE-I&list=PLz4Z1aEWwQ0RAOlfppXWpkEJ-HgOfHHjR&index=6\)
            const updated = await Actions.update(req.params.id, req.body)
            next(res.status(201).json(updated))
            
        }else{
            next(res.status(400).json(`BAD REQUEST - body:${req.body} `))
        }
    }catch(err){
        console.log(`UNKNOWN ERROR - @updateAction midware ${err}`)
        next()
    }
}

async function removeAction (req, res, next) {
    try{
        const ID = req.params.id
        const markedAction = await Actions.get(ID)
        if(!markedAction){
           next(res.status(404).json(`NOT_FOUND - ID_GIVEN:${ID}`))
        }else{
           await Actions.remove(ID)
           next(res.status(204))
        }
    }catch (err){
       console.log(`UNKNOWN ERROR - @removeAction midware ${err}`)
       next()
    }
}

module.exports = {
    getActions,
    getActionsById,
    createAction,
    updateAction,
    removeAction
}