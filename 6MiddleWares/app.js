//Express app with middlewares
const express = require("express");
const app = express()

//some random fake data
let users = [
    {
        id:1,
        name:"sriram"
    },
    {
        id:2,
        name:"aditya"
    },
    {
        id:2,
        name:"aneesh"
    }
]





//creating a middleware
const middleware1 = (request,response,next)=>{
    //next parameter is a function used to forward response object to next middleware
    console.log("This is middleware-1")

    next() //without next() request object is stuck inside this middleware and rest of the code
           //After this middleware is not executed
}


//to use the above middleware before every API request
app.use(middleware1)

//similarly express.json() is also a middleware use to extract JSON object from body
//it will be executed before every API request
app.use(express.json()) 




//To execute middleware for a specific request only
const middleware2=(request,response,next)=>{
    console.log("This is middleware2 specific for delete request /deleteuser path")
    next()
}


//To execute middleware for a specific request only
const middleware3=(request,response,next)=>{
    console.log("This middleware is only for specific paths only")
    next()
}
//To make middleware execute for specific paths only
//app.use(path,middleware)
app.use('/getusers',middleware3)
app.use(['/create-user','/getusers/:id'],middleware3)





//This is a request handler function
let requestHandler = (request,response)=>{
    let JSONObject = {
        message:"All users data", 
        payload:users 
    }
    response.send(JSONObject)
}

app.get('/getusers',requestHandler)

app.get('/getusers/:id',(request,response)=>{
    console.log(request.params)
    let id = (+request.params.id) 
    let userObj = users.find(x=>x.id==id) 
    console.log(userObj)

    if(userObj==undefined){
        response.send({message:"USER NOT FOUND"})
    }else{
        response.send({message:"USER FOUND", payload:userObj})
    }
})

//creating a new user
app.post('/create-user',(request,response)=>{
    console.log(request.body)
    let newUser = request.body
    users.push(newUser)
})

//updating a user
app.put('/update-user',(request,response)=>{
    let id = (+request.body.id)
    let idx = users.findIndex(x=>x.id==id)
    console.log(idx)
    if(idx==-1){
        response.send({message:"User not found"})
    }else{
        users[idx]=request.body
        response.send({message:"Users updated"})
    }
})

//deleting a user
app.delete('/delete-user/:id',middleware2,(request,response)=>{
    let id = (+request.params.id)
    let idx = users.findIndex(x=>x.id==id)
    if(dx==-1){
        response.send({message:"User not found"})
    }else{
        users.splice(idx,1)
        response.send({message:"User deleted"})
    }
})



//To handle invalid paths
//If no path is found at last this middleware will be executed
//use '*' it is valid for every path
app.use('*',(request,response,next)=>{
    response.send(`path ${request.url} is unavailable`)

    //here no next function should be defined 
})

//Error handling middleware, sends meaningfull error message as response
app.use((error,request,response,next)=>{
    response.send(`${error.message}`)
})

//assigning port number
const PORT_NUM = 4000
app.listen(PORT_NUM,()=>console.log("App running on",PORT_NUM))