/**
 * Created by Antianlu on 14-5-9.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Person(){
    // 调用superCtor的call方法
    EventEmitter.call(this);
}
// 使用util工具包的inherits实现继承
util.inherits(Person,EventEmitter);

Person.prototype.getName = function()
{
    return this.name;
}

Person.prototype.setName = function(name)
{
    this.name = name;
}
Person.prototype.sendData = function(data)
{
    this.emit('data',data);
}

// 如何使用
var person = new Person();

console.log(person instanceof EventEmitter)//true
console.log(Person.super_ === EventEmitter) //true

person.on('data',function(data){
    console.log(data);
})
person.sendData('It works!');