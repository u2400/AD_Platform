var Mongo = require("./model/mongodb");
var log = require("./controller/log");
//log();
function F_send_request(request){
    let req = request; //Enable Promise to accept the corresponding parameters
    return new Promise((req)=>{
        console.log(req.header);
        request({
            method: 'PUT',
            preambleCRLF: true,
            postambleCRLF: true,
            uri: 'http://service.com/upload',
            multipart: [
            {
                'content-type': 'application/json',
                body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
            },
            { body: 'I am an attachment' },
            { body: fs.createReadStream('image.png') }
            ],
            // alternatively pass an object containing additional options
            multipart: {
            chunked: false,
            data: [
                {
                'content-type': 'application/json',
                body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
                },
                { body: 'I am an attachment' }
            ]
            }
        },
        function (error, response, body) {
            if (error) {
            return console.error('upload failed:', error);
            }
            console.log('Upload successful!  Server responded with:', body);
        })
    })
}

Mongo.on("message",(res)=>{
    for(let i of res){
        F_send_request(i);
    }
})

var r = Mongo.start("find", [{

}, {
    // 'projection': {
    //     time: 1,
    //     unixdate: 1
    // },
    "sort": [
        ['unixdate', 1]
    ]
}])