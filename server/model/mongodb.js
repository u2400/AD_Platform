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
    let table = arguments[2] || "site" //Defining database table name
    var O_Operating_List = {};
    //Defining database opreations

    O_Operating_List["insert"] = function(dbo,json){   //Defining insert opreation
        if(json.constructor !== Array){
            json = [json];
        }

        dbo.collection(table).insertMany( json , function(err, res) {
            if (err) throw err;
        });
    }
 
    O_Operating_List["find"] = function(dbo,json){ //Defining find opreation
        
        dbo.collection(table).find(...json).toArray(function(err, res) {
            if (err) throw err;
            EventEmitter.emit("message",res);
        });
    }

    O_Operating_List["delete"] = function(dbo,json,JustOne = true){ //Defining delete opreation
        let Type = JustOne ? "deleteOne" : "deleteMany"; //Whether to delete only one record
        dbo.collection(table)[Type](json);
    }

    MongoClient.connect(url,{useNewUrlParser: true},(err, client)=>{
        if (err) {
            console.log(err);
        }
        var dbo = client.db('log');
        O_Operating_List[act](dbo,json); 
        client.close();
    })
}

module.exports = mongo;