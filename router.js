const Router = require('koa-router');
const log = require("./controller/log").mod;

var router = new Router()
.get('/log',async(ctx,next)=>{
    log(ctx);
})
.get('/hello',async(ctx,next)=>{
    ctx.body = 'hello!';
})
module.exports = router;