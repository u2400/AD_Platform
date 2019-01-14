const events = require('events').EventEmitter;

mod = function (str,resolve){
    var HTTPParser = process.binding('http_parser').HTTPParser;
    parser = new HTTPParser(HTTPParser.REQUEST);

    const kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0; 
    
    //Defining variables
    var requests = {}; //The object that stores the http body
    var header = {}; //The object that stores the http headers

    
    //organize request content
    (function([a,b,c]){
        requests.time = ("20"+b);
        requests.unixdate = Date.parse(requests.time);
        requests.ser_ip = c;
    })(/^\[(.*?)\]\nSRC.*?IP: (.*?)\n/i.exec(str));

    str = str.replace(/^.*?\n.*?\n/,"");
    requests.body = str;
    str += "\n\n";
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
        requests.header = header;
        resolve(requests);
    }

    request = new Buffer.from(str);
    parser.execute(request);
}
module.exports = mod;