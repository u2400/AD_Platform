const O_mongo = new (require("./mongodb"))();

module.exports = async function(){
    let act = arguments[0];
    let json = arguments[1];
    let option = arguments[2] || {};

    return new Promise((resolve, reject)=>{
        O_mongo.start(act, json, option, (res) => {
            resolve(res);
        })  
    })
}

