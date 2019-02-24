// Generated by CoffeeScript 2.3.2
(function() {
  var crypto;

  crypto = require('crypto');

  mod.Generator = function(pass) {
    var key, salt;
    salt = crypto.randomBytes(4096);
    key = crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512');
    return [salt, key];
  };

  mod.Checker = function([pass, salt, key]) {
    var res;
    if (key === crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512')) {
      res = true;
    } else {
      res = false;
    }
    return res;
  };

  mod.LoginCookieGenerator = function([username, key, ip]) {
    var Cookie, random, random_hash;
    random = crypto.randomBytes(128);
    random_hash = crypto.pbkdf2Sync(random, username, 1, 64, 'sha512').toString("hex");
    Cookie = crypto.pbkdf2Sync(`${key}${username}${ip}`, random_hash, 100, 64, 'sha512');
    return [random_hash, Cookie.toString("hex")];
  };

  mod.LoginCookieChecker = function([Cookie, random_hash, username, key, ip]) {
    var res, server_Cookie;
    server_Cookie = crypto.pbkdf2Sync(`${key}${username}${ip}`, random_hash, 100, 64, 'sha512');
    if (Cookie === server_Cookie.toString("hex")) {
      res = true;
    } else {
      res = false;
    }
    return res;
  };

  module.exports = mod;

}).call(this);