//Express app
const express = require("express");
//it returns a function
const app = express()
app.use(express.json()) // to read JSON body from rest server

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
    //request.send() sends a JSON object, defining that object
    let JSONObject = {
        message:"All users data",//In client side,this message can tell what data is being sent 
        payload:users // this is actual data which is being sent to client
    }
    response.send(JSONObject)
}

//app.get is defined for every url and http-method
//syntax: app.<http-method>("/path",requestHandler) 
app.get('/getusers',requestHandler)





//similarly for dynamic urls like /getusers/1, /getusers/2, where we need to send a specific user
//we can user /getusers/:id , id represents those 1, 2,.....
app.get('/getusers/:id',(request,response)=>{
    //that :id can be read by request.params method
    console.log(request.params)
    //in console it prints { id: '1' } for GET http://localhost:4000/getusers/1
    //it returns in string format 

    //logic to return a user with that specified id
    let id = (+request.params.id) //type casting to int and saving id value from url in id variable
    let userObj = users.find(x=>x.id==id) 
    //find method checks takes a parameter x which is object at each index
    //and performs the specified operation which is x.id==id in this case
    //if x.id i.e id at a specified index matches with urlId i.e id then it returns that object
    //if not found it returns undefined
    console.log(userObj)

    if(userObj==undefined){
        response.send({message:"USER NOT FOUND"})
    }else{
        response.send({message:"USER FOUND", payload:userObj})
    }
    //when id is given as 2 it only returns 1st object i.e aditya
})



//creating a new user
app.post('/create-user',(request,response)=>{
    console.log(request.body)
    let newUser = request.body
    users.push(newUser)
})



//updating a user
app.put('/update-user',(request,response)=>{
    // console.log(request.body)
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
app.delete('/delete-user/:id',(request,response)=>{
    let id = (+request.params.id)
    let idx = users.findIndex(x=>x.id==id)
    if(idx==-1){
        response.send({message:"User not found"})
    }else{
        users.splice(idx,1)
        response.send({message:"User deleted"})
    }
})


//assigning port number
const PORT_NUM = 4000
app.listen(PORT_NUM,()=>console.log("App running on",PORT_NUM))