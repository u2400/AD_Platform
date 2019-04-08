// const Promise_mongo = require("./model/Promise_mongo");
// (async function(){
//     Promise_mongo("find", [], {db_name:"log", table_name:"test1"})
//     .then((res) => {
//         console.log(res);
//     })
// })()
// (async ()=>{
//     var a = await(async function(){
//         let p_arr = [];
//         [1,2,3,4].forEach((ele) => {
//             let a = new Promise((resolve, reject)=>{
//                 resolve(ele);
//             })
//             p_arr.push(a);
//         })
//         return await Promise.all(p_arr);
//     })()
//     console.log(a);
// })()
const SendResqust = require("./controller/SendRequest");

SendResqust(["test1", [
    "5c9303ee03537814e0aeda3a",
    "5c9303ee03537814e0aeda3b",
    "5c9303ee03537814e0aeda3c"
]])



