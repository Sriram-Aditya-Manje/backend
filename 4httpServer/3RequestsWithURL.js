const http = require('http')

const server = http.createServer((request,response)=>{
    //different logics for different requests
    //output can be viewed in rest client : req.http
    if(request.method=="GET"){
        //for url http://localhost:3000/getusers and get request
        if(request.url==='/getusers')
            response.end("Get users request")
        //for url http://localhost:3000/getproducts and get request
        if(request.url==='/getproducts')
            response.end("Get products request")
    }

    if(request.method=="POST"){
        response.end("POST request")
    }

    if(request.method=="PUT"){
        response.end("PUT request")
    }

    if(request.method=="DELETE"){
        response.end("DELETE request")
    }
})

const PORT_NUM = 3000
server.listen(PORT_NUM,()=>console.log("Server running at",PORT_NUM,"open browser"))

//TO OVERCOME THIS CLUMPSYNESS PROBLEM EXPRESS.JS IS USED