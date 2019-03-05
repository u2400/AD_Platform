const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./router');
const cfg = require('./config');
const cookieParser = require('cookie-parser')
const app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) { console.log('a user connected'); });
app.disable('x-powered-by');
app.use(bodyparser.json());
app.use(cookieParser(cfg.web.key));
app.use(bodyparser.urlencoded());
app.use('/',express.static(require('path').join(__dirname,'./assert')));
routes.forEach(route=>{
    require(route)(app);
});
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).json({error:"server error"});
});
app.listen(cfg.web.port,()=>{
    console.log(`listening ${cfg.web.port}`)
})
