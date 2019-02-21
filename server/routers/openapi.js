const express = require('express');
const router = new express.Router();

router
// .use(function (req, res, next) {
//     // res.setHeader('X-Powered-By', '');
//     next();
// })
.get('/login',(req,res)=>{
    return res.send(`login OK!`);
})
.get('/regsiter',(req,res)=>{
    res.cookie('nick', {username:"gcc", _k:"123", _r:"321"}, {signed: true, httpOnly: true});
    console.log(req.signedCookies);
    return res.send(`reg OK!`);
})
.use(function (err, req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({error:"server error"});
})
module.exports = (app)=>{
    app.use('/open',router);
}