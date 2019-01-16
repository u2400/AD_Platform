const request = require("request");
var Mongo = require("./model/mongodb");

Mongo.on("message",(res)=>{
    console.log(res);
//     request({
//     method: 'PUT',
//     preambleCRLF: true,
//     postambleCRLF: true,
//     uri: 'http://service.com/upload',
//     multipart: [
//       {
//         'content-type': 'application/json',
//         body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
//       },
//       { body: 'I am an attachment' },
//       { body: fs.createReadStream('image.png') }
//     ],
//     // alternatively pass an object containing additional options
//     multipart: {
//       chunked: false,
//       data: [
//         {
//           'content-type': 'application/json',
//           body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
//         },
//         { body: 'I am an attachment' }
//       ]
//     }
//   },
//   function (error, response, body) {
//     if (error) {
//       return console.error('upload failed:', error);
//     }
//     console.log('Upload successful!  Server responded with:', body);
//   })
})

var r = Mongo.start("find", [{}, {
    'projection': {
        time: 1,
        unixdate: 1
    },
    "sort": [
        ['unixdate', 1]
    ]
}]);