const express = require('express')
//instead of creating sep express for every file we are creating route for this file from
//main express userApp, this is a mini express userApp.
const userApp = express.Router()

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

//This is a request handler function
let requestHandler = (request,response)=>{
    let JSONObject = {
        message:"All users data", 
        payload:users 
    }
    response.send(JSONObject)
}

userApp.get('/getusers',requestHandler)

userApp.get('/getusers/:id',(request,response)=>{
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
userApp.post('/create-user',(request,response)=>{
    console.log(request.body)
    let newUser = request.body
    users.push(newUser)
})

//updating a user
userApp.put('/update-user',(request,response)=>{
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
userApp.delete('/delete-user/:id',(request,response)=>{
    let id = (+request.params.id)
    let idx = users.findIndex(x=>x.id==id)
    if(dx==-1){
        response.send({message:"User not found"})
    }else{
        users.splice(idx,1)
        response.send({message:"User deleted"})
    }
})

module.exports=userApp