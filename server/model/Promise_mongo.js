const mongo = require("./mongodb");

Promise_mongo_error = function Promise_mongo_error(file_name, func_name, err) {
    console.error(`Promise_mongo error in  ${file_name}'s function ${func_name}:`);
    console.error(err);
}

module.exports = async function(){
    let act = arguments[0];
    let json = arguments[1];
    let option = arguments[2] || {};
    let O_mongo = new mongo();
    return new Promise((resolve, reject)=>{

        O_mongo.start(act, json, option, (res) => {
            resolve(res);
        })  
    })
}

