var unfilted_data = [];

var Opreretion_list = {};

Opreretion_list["SendRequest"] = function (url = site)
{
    var xmlhttp=new XMLHttpRequest();
    if (xmlhttp!=null)
    {
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4)
            {
                if (xmlhttp.status==200)
                {
                    unfilted_data = JSON.parse(xmlhttp.responseText);
                    console.log(unfilted_data);
                }
            }
        };
        xmlhttp.open("GET",`api/getalllog/${url}`,true);
        xmlhttp.send(null);
    }
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
    try{
        console.log("in worker", act, data);
        Opreretion_list[act](data);   
    }
    catch(e){
        console.log(e);
    }
}