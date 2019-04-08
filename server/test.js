// const Promise_mongo = require("./model/Promise_mongo");
// (async function(){
//     Promise_mongo("find", [], {db_name:"log", table_name:"test1"})
//     .then((res) => {
//         console.log(res);
//     })
// })()
(async ()=>{
    const SendResqust = require("./controller/send_request_feedback");
    let res = await SendResqust(["find",{table_name:"341a42b5f66acfed0acdafdfd5ef7e37437b4cf3e947b7f8ad"}]);
    console.log("test:",res);
})()




