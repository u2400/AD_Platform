
var events = require('events');
const readline = require('readline');
const fs = require('fs');
const iconv = require('iconv-lite');

mod = function(file = `./web_log_10`,callback){
    let input = fs.createReadStream(file);

    events.on('message',callback());

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
            events.emit("message",request); //Trigger the message event
            request = "";
        }
    });

    rl.on('close', async function(line){
        request = iconv.decode(request, 'utf-8');
        events.emit("message",request); //Trigger the message event
    });
}
module.exports = mod;