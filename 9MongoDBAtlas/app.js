//Express app with middlewares
const express = require("express");
const app = express()
const mongoClient = require("mongodb").MongoClient

const DBurl = "mongodb+srv://aditya243:aditya243@cluster0.o8qi9yi.mongodb.net/?retryWrites=true&w=majority"
//connection to DB with .connect() method
//this returns a promise


mongoClient.connect(DBurl)
//if connection is success
.then((Client)=>{
    
    //Create to access the db in the cluster
    //Tutorial db will be created if not present and will be accessed
    let dbObj=Client.db("Tutorial");

    //on the dbObject "dbObj" we are creating objects for accessing collections
    let userCollection = dbObj.collection("userCollection")
    let productCollection = dbObj.collection("productCollection")

    //sharing these collection accross the project
    app.set("userCollection",userCollection)//app.set(key,value) its better to take same name as key to avoid confusion
    app.set("productCollection",productCollection)
    //app.get method is used to access these collections anywhere in the project

    console.log("DB connection success")
})
//if connection is unsuccessfull
.catch(err=>console.log("error in DB connection",err))


const userApp = require('./APIs/UserAPI')
const ProductsApp = require('./APIs/ProductAPI')

//when path starts with '/user-api' it is redirected to userApp
app.use('/user-api',userApp)
//when path starts with '/product-api' it is redirected to userApp
app.use('/product-api',ProductsApp)


app.use('*',(request,response,next)=>{
    response.send(`path ${request.url} is unavailable`)

})

//Error handling middleware, sends meaningfull error message as response
app.use((error,request,response,next)=>{
    response.send(`${error.message}`)
})

//assigning port number
const PORT_NUM = 4000
app.listen(PORT_NUM,()=>console.log("App running on",PORT_NUM))