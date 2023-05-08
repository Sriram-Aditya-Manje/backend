console.log("Water")
console.log("dish")
//These are blocking requests soo..

//This func needs 5secs soo, next part of program will be executed instead of
//waiting for this func to complete execution
setTimeout(()=>{
    console.log("dish delivered")//This part of function is executed 2nd
},5000)


setTimeout(()=>{
    console.log("water delivered")//This part of function is executed 1st
},1000)

//This is async behaviour incase of blocking reqs
//in terminal node <fileName>.js for async behaviour
//in terminal node <fileName> for normal line by line behaviour