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
        let method;
        switch(arguments[3]){
            case 0:
            method = "DELETE";
            break;
            case 1:
            method = "GET";
            break;
            case 2:
            method = "HEAD";
            break;
            case 3:
            method = "POST";
            break;
            case 4:
            method = "PUT";
            break;
            case 5:
            method = "CONNECT";
            break;
            case 6:
            method = "OPTIONS";
            break;
            case 7:
            method = "TRACE";
            break;
            default:
            method = "NOT FOUND!";
            console.log("Warning, the type of http request not found, please check if the request is an http request !");
        }
        requests.method = method;
        requests.header = header;
        resolve(requests);
    }

    //convert raw logs from buffer to string
    request = new Buffer.from(str);
    parser.execute(request);
}
module.exports = mod;