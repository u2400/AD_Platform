var MongoClient = require('mongodb');
const crypto = require('crypto');
const events = require('events').EventEmitter;
const EventEmitter = new events();
const url = `mongodb://127.0.0.1:27017`; //Defining databases address
const A_NeedArrOperting_List = ["find", "insert", "update", "count"]; //需要一个数组的操作名称

module.exports = class {
    constructor() {
        this.hash = crypto.pbkdf2Sync((new Date()).toString(), crypto.randomBytes(4096), 1, 64, 'sha512').toString("hex");
    }

    start() {
        let act = arguments[0];
        let json = arguments[1];
        let option = arguments[2] || {};
        let callback = arguments[3];

        EventEmitter.on(this.hash, callback);
    
        //Defining database name
        option.db_name == undefined ? option.db_name = "log" : null ;
    
        //Defining database table name
        option.table_name == undefined ? option.table_name = "site" : null ;
    
        //Necessary type conversion
        if(A_NeedArrOperting_List.indexOf(act) != -1 && json.constructor !== Array) {
            json = [json];
        }
    
        console.log("Option:", option);
        var O_Operating_List = {};
        O_Operating_List.hash = this.hash;
        //Defining database opreations
        O_Operating_List["insert"] = function(dbo, option, json) {   //Defining insert opreation
            if(json.constructor !== Array){
                json = [json];
            }
    
            dbo.collection(option.table_name).insertMany( json, function(err, res) {
                if (err) {
                    console.log("In mongodb.js operating insert error:");
                    console.log(err);
                }
            });
        }
     
        O_Operating_List["find"] = function(dbo,option,json) { //Defining find opreation
            dbo.collection(option.table_name).find(...json).toArray(function(err, res) {
                if (err) {
                    console.log("In mongodb.js operating find error:");
                    console.log(err);
                }
                EventEmitter.emit(this.hash,res);
            });
        }
    
        O_Operating_List["delete"] = function(dbo, option, json) { //Defining delete opreation
            try{
                option.JustOne = option.JustOne || true;
                //Whether to delete only one record
                let Type = JustOne ? "deleteOne" : "deleteMany"; 
    
                dbo.collection(option.table_name)[Type](json);
            }
            catch(err){
                console.log("Mongo delete error:");
                console.log(option, json, err);
            }
        }
    
        O_Operating_List["update"] = function(dbo,option,json) {
            try{
                option.JustOne = option.JustOne || true;
                let Type = option.JustOne ? "updateOne" : "updateMany";
                dbo.collection(option.table_name)[Type](...json);
            }
            catch(err){
                console.error("Mongo update error:");
                console.error(option, json, err);
            }
        }
    
        O_Operating_List["count"] = function(dbo, option) {
            let res = dbo.collection(option.table_name).countDocuments({});
            EventEmitter.emit(this.hash, res);
        }
    
        O_Operating_List["collections"] = function(dbo, option, json) {        
            let res = dbo.listCollections().toArray();
            EventEmitter.emit(this.hash, res);
        }
    
        MongoClient.connect(url,{useNewUrlParser: true},(err, client)=> {
            if (err) {
                console.log("Mongo connect error");
                console.log(err);
            }
            try{
                var dbo = client.db(option.db_name);
                O_Operating_List[act](dbo,option,json);
                client.close();
            }
            catch(err){
                console.log("In mongodb.js MongoClient.connect error:");
                console.log(err);
            }
        })
    }
}
