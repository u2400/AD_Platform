const events = require('events').EventEmitter;

mod = function (str){
    var HTTPParser = process.binding('http_parser').HTTPParser;
    parser = new HTTPParser(HTTPParser.REQUEST);

    
    //organize request content
    str += `\n\n`;

    request = new Buffer.from(str);
    const kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0; 
    const kOnBody = HTTPParser.kOnBody | 0; 
    const kOnMessageComplete = HTTPParser.kOnMessageComplete | 0; 
    
    //Defining variables
    var requests = {}; //The object that stores the http body
    var header = {}; //The object that stores the http headers

    (function([a,b,c]){
        requests.time = b;
        requests.ser_ip = c;
    })(/^\[(.*?)\]\nSRC.*?IP: (.*?)\n/i.exec(str));
    str = str.replace(/^.*?\n.*?\n/,"");

    //Get the http request header content and organize it into an object
    parser[kOnHeadersComplete] = 
    function() {
        let key,value;
        for (let i in arguments[2]){
            if(i%2 === 0){
                key = arguments[2][i];
            }
            else{
                value = arguments[2][i];
            }
            header[key] = value;
        }
    }

    //Get the complete request content
    parser[kOnBody] = 
    function() {
        requests.body = arguments[0];
    }

    parser[kOnMessageComplete] = 
    function() { 
        requests.header = header;
    } 

    parser.execute(request);
}
module.exports = mod;