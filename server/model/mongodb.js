var MongoClient = require('mongodb');
const events = require('events').EventEmitter;
const EventEmitter = new events();
const url = `mongodb://127.0.0.1:27017`; //Defining databases address

var mongo = {};
mongo.on = function(event,callback){
    EventEmitter.on(event,callback);
}

mongo.start = function(){
    let act = arguments[0];
    let json = arguments[1];
    var option = arguments[2] || {};

    //Defining database table name
    option.table_name == undefined ? option.table_name = "site" : null ;

    var O_Operating_List = {};
    //Defining database opreations

    O_Operating_List["insert"] = function(dbo,option,json){   //Defining insert opreation
        if(json.constructor !== Array){
            json = [json];
        }

        dbo.collection(option.table_name).insertMany( json , function(err, res) {
            if (err) throw err;
        });
    }
 
    O_Operating_List["find"] = function(dbo,option,json){ //Defining find opreation
        
        dbo.collection(option.table_name).find(...json).toArray(function(err, res) {
            if (err) throw err;
            EventEmitter.emit("message",res);
        });
    }

    O_Operating_List["delete"] = function(dbo,option,json){ //Defining delete opreation
        option.JustOne = option.JustOne || true;
        let Type = JustOne ? "deleteOne" : "deleteMany"; //Whether to delete only one record
        dbo.collection(option.table_name)[Type](json);
    }

    O_Operating_List["update"] = function(dbo,option,json){
        option.JustOne = option.JustOne || true;
        let Type = JustOne ? "updateOne" : "updateMany";
        dbo.collection(option.table_name)[Type](...json);
    }

    MongoClient.connect(url,{useNewUrlParser: true},(err, client)=>{
        if (err) {
            console.log(err);
        }
        var dbo = client.db('log');
        O_Operating_List[act](dbo,option,json);
        client.close();
    })
}

module.exports = mongo;