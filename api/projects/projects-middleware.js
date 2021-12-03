// add middlewares here related to projects
const Projects = require('./projects-model');



 async function reqProjects (req, res, next) {

    try{
        const projects = await Projects.get()
        if(projects.length >= 0){
            next(res.status(200).json(projects))
        }else{
            next(res.status(404).json(projects))
        }
    
    }catch(err){
        console.log(`UNKNOWN ERROR - @reqProjects midware ${err}`)
        next()
    }
 }

 async function reqProjectById (req, res, next) {
    
    try{
        const ID = req.params.id
        const project = await Projects.get(ID)
        if(!project){
            next(res.status(404).json(`NOT_FOUND - ID_GIVEN:${ID}`))
        }else{
            next(res.status(200).json(project))
        }
    }catch(err){
        console.log(`UNKNOWN ERROR - @reqProjectById midware ${err}`)
        next()
    }
 }

 async function reqCreateProj (req, res, next) {
    try{
        if(!req.body.name || !req.body.description || !req.body.completed){
            next(res.status(400).json(`BAD REQUEST - body:${req.body} `))
        }else{
            const newProject = await Projects.insert(req.body) 
            next(res.status(201).json(newProject))
        }
    }catch(err){
        console.log(`UNKNOWN ERROR - @reqCreateProj midware ${err}`)
        next()
    }
 }

 async function reqUpdateProj (req, res, next) {
    try{
        const ID = req.params.id
        const reqProj = await Projects.get(ID)

        if(!reqProj){
            next(res.status(404).json(`NOT_FOUND - ID_GIVEN:${ID}`))
                                                                            
        }if(req.body.name && req.body.description && "completed" in req.body){ //making sure key is IN obj (very cool need to use this more  /nother song https://www.youtube.com/watch?v=XgL3RMNhE-I&list=PLz4Z1aEWwQ0RAOlfppXWpkEJ-HgOfHHjR&index=6\)
            const updatedProj = await Projects.update(req.params.id, req.body)
            next(res.status(201).json(updatedProj))
            
        }else{
            next(res.status(400).json(`BAD REQUEST - body:${req.body} `))
        }
    }catch(err){
        console.log(`UNKNOWN ERROR - @reqUpdateProj midware ${err}`)
        next()
    }
 }

 async function reqRemoveProj (req, res, next) {
     try{
         const ID = req.params.id
         const markedProJ = await Projects.get(ID)
         if(!markedProJ){
            next(res.status(404).json(`NOT_FOUND - ID_GIVEN:${ID}`))
         }else{
            await Projects.remove(ID)
            next(res.status(204))
         }
     }catch (err){
        console.log(`UNKNOWN ERROR - @reqRemoveProj midware ${err}`)
        next()
     }
 }

 async function reqGetActions(req, res, next) {
    try{
        const ProjectActions = await Projects.getProjectActions(req.params.id)

        if(ProjectActions.length){
            next(res.status(200).json(ProjectActions))
        }else{
            next(res.status(404).json([]))
        }
    }catch(err){
        console.log(`UNKNOWN ERROR - @reqGetActions midware ${err}`)
        next()
    }
}

module.exports = {
    reqProjects,
    reqProjectById,
    reqCreateProj,
    reqUpdateProj,
    reqRemoveProj,
    reqGetActions
}