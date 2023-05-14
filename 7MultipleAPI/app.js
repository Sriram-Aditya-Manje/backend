//Express app with middlewares
const express = require("express");
const app = express()


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