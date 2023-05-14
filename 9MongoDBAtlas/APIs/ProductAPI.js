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
    //geting the product collection object
    let prodCollectionObj = request.app.get("productCollection")

    //get new product data from request body
    let product = request.body;

    //insert product object
    //<collection>.insertOne()
    //These function calls are blocking requests 
    //to handle with these blocking reqs there are 3 ways 1.Callback funcs, 2.Promises, 3.Async
    //1.callback implementation here , 2.Promise implementation at delete url
    prodCollectionObj.insertOne(product,(err,result)=>{
        if(err){
            console.log("error occured",err)
        }else{
            response.send("Product inserted successfully")
        }
    })

})

//async await implementation
// ProductsApp.post('/create-Products',async(request,response)=>{
//     let prodCollectionObj = request.app.get("productCollection")

//     let product = request.body;
//     let result=await prodCollectionObj.insertOne(product)
//     response.send("product inserted successfully")
// })

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
    let prodCollectionObj = request.app.get("productCollection")
    console.log("working on deleting record")

    prodCollectionObj.find({id:id},(err,result)=>{
        if(err){
            response.send("Error occured: ",err)
        }else{
            prodCollectionObj.deleteOne({id:id})
            .then(result=>response.send("product deleted successfully"))
            .catch(err=>response.send("This error occured while deleting the object: ",err))
        }
    })
})

module.exports=ProductsApp