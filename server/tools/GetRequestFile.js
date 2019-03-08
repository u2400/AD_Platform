// Generated by CoffeeScript 1.12.7
(function() {
  var mod;

  mod = function(body) {
    var Arr, Obj, reg, result;
    Arr = body.match(/Content-Type\:.*?boundary=-*(.*;?)+/);
    if (Arr) {
      reg = "\n-*" + Arr[1] + "[\\s\\S]*?filename=\"(.*)\"[\\s\\S]*?(?:Content-Type:.*)([\\s\\S]*?)-*" + Arr[1];
      reg = new RegExp(reg);
      if (/[^0-9a-z\-]/.test(Arr[1])) {
        new Error("unexpected token");
      }
      result = body.match(reg);
      Obj = {
        file_name: result[1],
        file_content: result[2]
      };
    } else {
      Obj = null;
    }
    return Obj;
  };

  module.exports = mod;

}).call(this);
