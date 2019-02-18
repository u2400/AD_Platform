const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./router');
const cfg = require('./config');
const cookieParser = require('cookie-parser')
const app = new express();

app.use(bodyparser.json());
app.use(cookieParser(cfg.web.key));
app.use(bodyparser.urlencoded());
app.use('/assets',express.static(require('path').join(__dirname,'../assets')));
routes.forEach(route=>{
    require(route)(app);
});
app.listen(cfg.web.port,()=>{
    console.log(`listening ${cfg.web.port}`)
})
