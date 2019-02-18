crypto = require('crypto')

mod.Generator = (pass) ->
    salt = crypto.randomBytes(4096)
    key = crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512')
    [salt, key]

mod.Checker = ([pass, salt, key]) ->
    if key == crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512')
        res = true
    else
        res = false
    res

mod.LoginCookieGenerator = ([username, key, ip]) ->
    random = crypto.randomBytes(128)
    random_hash = crypto.pbkdf2Sync(random, username, 1, 64, 'sha512').toString("hex")
    Cookie = crypto.pbkdf2Sync("#{key}#{username}#{ip}", random_hash, 100, 64, 'sha512')
    [random_hash, Cookie.toString("hex")]

mod.LoginCookieChecker = ([Cookie, random_hash, username, key, ip]) ->
    server_Cookie = crypto.pbkdf2Sync("#{key}#{username}#{ip}", random_hash, 100, 64, 'sha512')
    if Cookie == server_Cookie.toString("hex")
        res = true
    else
        res = false
    res


module.exports = mod


