let crypto = require('crypto');
function randomstrlog(err){
    console.error(`randomstr error: ${err}`);
}

module.exports = function(length) {
    try{
        if(JSON.stringify(arguments) === "{}") {
            return Math.random().toString("16").substr(2);
        }
        else {
            if(length.constructor !== Number) {
                throw new Error("The length parameter must be a number");
            }
            return crypto.randomBytes(length).toString("hex");
        }
    }
    catch(err) {
        randomstrlog(err);
        return false;
    }
}