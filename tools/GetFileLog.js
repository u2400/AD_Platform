const events = require('events').EventEmitter;
const readline = require('readline');
const fs = require('fs');
const iconv = require('iconv-lite');
var mod = {};
const EventEmitter = new events();
mod.on = function(event,callback){
    EventEmitter.on(event,callback);
}
mod.start = function(file){
    let input = fs.createReadStream(file);

    const rl = readline.createInterface({
        input: input
    });

    var request = "";
    rl.on('line', (line) => {
        if(line !=`--------------------------------------------------`){ //Http log separator
            request += (line + '\n');
        }
        else{
            request = iconv.decode(request, 'utf-8');
            if(request != ""){
                EventEmitter.emit("message",request); //Trigger the message event
            }
            request = "";
        }
    });

    rl.on('close', function(line){
        request = iconv.decode(request, 'utf-8');
        EventEmitter.emit("message",request); //Trigger the message event
    });
}
module.exports = mod;