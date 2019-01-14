var test = require("./model/mongodb");
test("find",{$query: {}, $orderby: { time : -1 }});
//