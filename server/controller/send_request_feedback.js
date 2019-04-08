const Promise_mongo = require("../model/Promise_mongo");
const db_name = "tmp";
const file_name = "send_request_feedback";

let mod = function([act,option = ""]) {
    let O_operation_list = {};

    //列出临时数据表目录
    O_operation_list['show'] = async function(option) {
        let show = await Promise_mongo("collections", {}, {db_name})
        .catch(err => {
            Promise_mongo_error(file_name, `O_operation_list['show']`, err);
        })
        .then(res => {
            return res;
        })
        .then(res => {
            let arr = [];
            res.forEach(element => {
                arr.push(element.name);
            });
            return arr;
        })
        console.log(show);
        return show;
    }

    //列出临时数据表内容
    O_operation_list['find'] = async function(option) {
        let table_name = option.table_name;
        if (/^[a-z0-9]{1,}$/.test(table_name)) {
            let find = await Promise_mongo("find", {}, {db_name, table_name})
            .catch(err => {
                Promise_mongo_error(file_name, `O_operation_list['find']`, err);
                return [];
            })
            .then(res => {
                return res;
            })
            return find;
        }
        else {
            console.error(`Invalid table name:${table_name}`);
            return [];
        }
    }

    let res;
    try{
        res = O_operation_list[act](option);
    }
    catch(e) {
        console.log(e);
    }
    finally {
        res = res || [];
        console.log("res:", res);
        return res;
    }
}

module.exports = mod;