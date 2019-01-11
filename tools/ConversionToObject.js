mod = function (str){
    var HTTPParser = process.binding('http_parser').HTTPParser;
    parser = new HTTPParser(HTTPParser.REQUEST);

    // Request content for testing
//     str=`POST /index.php HTTP/1.1
// Host: 47.106.182.92:30001
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
// Accept-Language: zh-CN
// Accept-Encoding: gzip, deflate
// Connection: close
// Cookie: PHPSESSID=unfs48427tro0rts8b02r81kv7
// Upgrade-Insecure-Requests: 1
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 22

// function=system&cmd=ls
// `;
    //organize request content
    str += `\n\n`;

    request = new Buffer.from(str);
    const kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0; 
    const kOnBody = HTTPParser.kOnBody | 0; 
    
    //Defining variables
    var requests = {}; //The object that stores the http body
    var header = {}; //The object that stores the http headers

    //Get the http request header content and organize it into an object
    parser[kOnHeadersComplete] = 
    function() {
        console.log(arguments);
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
        console.log(header);
    }

    //Get the complete request content
    parser[kOnBody] = 
    function() {
        console.log(arguments[0].toString()); 
    }
    parser.execute(request); 
}
module.exports = mod;