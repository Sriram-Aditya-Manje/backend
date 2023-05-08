const http = require('http')
//importing http module which has all inbuilt server capabilities
//declare it as const so it cant be re assigned by something else


//creating server using createSerer() method
//Server needs to deal with HttpRequest and HttpResponses
//request and response are these Httpreq and HttpResp..
const server = http.createServer((request,response)=>{
    response.end("hello world") //end() method is used to send something from server
    //hello world will be displayed

    console.log(request.method) // type of request of server is handling can be viewed
                                // by .method method
})


//assigning port number
const PORT_NUM = 3000
server.listen(
    PORT_NUM,//this is port number of server
    ()=>console.log("Server running at",PORT_NUM,"open browser")//This function is executed 
                                                  //After portnum is assigned 
)