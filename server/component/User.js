/*
    2019.2.17
    user仍未完成需要对数据库返回的数据进行解包
*/

const O_Mongo = require("../model/mongodb");
const O_Password = require("../tools/Passwod");

function login_successful(){

}


mod = function(act, value, req, res){
    var O_Operating_List = {};

    O_Operating_List['login'] = function(username, password){
        O_Mongo.on("message",(ret)=>{
            console.log(ret);
            //TODO...
              //slat 和 key 来自数据库
            if(O_Password.Checker([password,slat,Key])){
                login_successful(res,req);
            }
        })

        O_Mongo.start('find',[{"username":username},{'projection':{password: 1, slat:1, _id:0 }}]);
    }

    O_Operating_List['register'] = function(username, password){
        O_Mongo.on("message",function(res){
            if(res.length === 0){
                let [slat, password] = O_Password.Generator(password);
                O_Mongo.start("insert",{username:username, password: password, slat: slat});
            }
            else{
                return {error:"用户名已存在"};
            }
        })
        O_Mongo.start("find",[{username: username},{'projection':{_id: 1}}])
    }

    O_Operating_List[act](...value);
}