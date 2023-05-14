const express = require('express')
//instead of creating sep express for every file we are creating route for this file from
//main express ProductsApp, this is a mini express ProductsApp.
const ProductsApp = express.Router()

//some random fake data
let Products = [
    {
        id:1,
        name:"Cooler"
    },
    {
        id:2,
        name:"Fridge"
    },
    {
        id:2,
        name:"AC"
    }
]

ProductsApp.use(express.json()) 

//This is a request handler function
let requestHandler = (request,response)=>{
    let JSONObject = {
        message:"All Products data", 
        payload:Products 
    }
    response.send(JSONObject)
}

ProductsApp.get('/getProducts',requestHandler)

ProductsApp.get('/getProducts/:id',(request,response)=>{
    console.log(request.params)
    let id = (+request.params.id) 
    let ProductsObj = Products.find(x=>x.id==id) 
    console.log(ProductsObj)

    if(ProductsObj==undefined){
        response.send({message:"USER NOT FOUND"})
    }else{
        response.send({message:"USER FOUND", payload:ProductsObj})
    }
})

//creating a new Products
ProductsApp.post('/create-Products',(request,response)=>{
    console.log(request.body)
    let newUser = request.body
    Products.push(newUser)
})

//updating a Products
ProductsApp.put('/update-Products',(request,response)=>{
    let id = (+request.body.id)
    let idx = Products.findIndex(x=>x.id==id)
    console.log(idx)
    if(idx==-1){
        response.send({message:"User not found"})
    }else{
        Products[idx]=request.body
        response.send({message:"Users updated"})
    }
})

//deleting a Products
ProductsApp.delete('/delete-Products/:id',(request,response)=>{
    let id = (+request.params.id)
    let idx = Products.findIndex(x=>x.id==id)
    if(idx==-1){
        response.send({message:"User not found"})
    }else{
        Products.splice(idx,1)
        response.send({message:"User deleted"})
    }
})

module.exports=ProductsApp