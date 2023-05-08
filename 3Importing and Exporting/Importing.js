//for importing => returns a object that is being exported
let x =require('./Exporting')
let y = require('./mutlipleExports')
let {person,arr} = require('./mutlipleExports') // variables name should be same

console.log(x)
console.log(y)
console.log(person, arr)