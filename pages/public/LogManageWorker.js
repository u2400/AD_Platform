var unfilted_data = [];

var Opreretion_list = {};

Opreretion_list["SendRequest"] = function (workspace = 'site')
{
    return fetch(`/api/getalllog/${workspace}`)
    .then(res=>{
        res = res.json;
    })
    .then(res=>{
        unfilted_data = res;
    })
}

Opreretion_list["FilterData"] = ([rule])=>{
    rule = rule.data;
    var local_data = [];
    if(rule == ""){
        local_data = unfilted_data;
    }
    else{
        unfilted_data.forEach(function(data){
            let a;
            console.log(rule);
            eval(`if(${rule}){
                a = true;
            }
            else{
                a = false;
            }`);
            if(a){
                local_data.push(data);
            }
        });
    }
    postMessage(local_data);
}
onmessage = function (mes){
    let [act, data] = mes.data;
    return new Promise((resolve, reject)=>{
        try{
            console.log("in worker", act, data);
            Opreretion_list[act](data);   
        }
        catch(e){
            console.log(e);
            reject(e);
        }
        resolve();
    })
}