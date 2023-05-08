const http = require('http')

const server = http.createServer((request,response)=>{
    //different logics for different requests
    //output can be viewed in rest client : req.http
    if(request.method=="GET"){
        response.end("GET request")
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