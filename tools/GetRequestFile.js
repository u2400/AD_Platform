
var mod = function(){
    var Arr = a.match(/Content-Type\:.*?boundary=-*(.*;?)+/);
    if(/[^0-9a-z\-]/.test(Arr[1])){
        return new Error("unexpected token");
    }
    var reg = new RegExp(`\n-*${Arr[1]}[\\s\\S]*?filename="(.*)"[\\s\\S]*?(?:Content-Type:.*)([\\s\\S]*?)-*${Arr[1]}--`);
    a.match(reg)
}
