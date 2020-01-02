var Opreretion_list = {};
unfilted_data = undefined;

async function check_data() {
    return new Promise(async (resolve, reject)=>{
        while(unfilted_data === undefined) {
            console.log("check_data: waiting");
            await sleep(200);
        }
        console.log("check_data: waiting end unfilted_data".unfilted_data);
        resolve(unfilted_data);
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Opreretion_list["SetWorkspace"] = function (workspace = 'site') {
    fetch(`/api/getalllog/${workspace}`)
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        let new_res = [];
        res.forEach((i)=>{
            i.key = i._id;
            new_res.push(i);
        })
        res = new_res;
        console.log("in check_data", res);
        unfilted_data = res
        console.log("SetWorkspace end",res);
    })
}

Opreretion_list["FilterData"] = async ([rule]) => {
    var local_data = [];
    unfilted_data = (await check_data());
    if(!rule || rule == ""){
        local_data = unfilted_data;
        console.log(local_data, unfilted_data);
    }
    else{
        unfilted_data.forEach(function(data){
            let a;
            console.log("in FilterData", rule);
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
    console.log("worker return", local_data);
    postMessage(local_data);
}

onmessage = function (mes){
    let [act, data] = mes.data;
    new Promise((resolve, reject)=>{
        try{
            console.log("worker get",[act, data]);
            Opreretion_list[act](data);   
        }
        catch(e){
            console.log(e);
            reject(e);
        }
        resolve();
    })
}