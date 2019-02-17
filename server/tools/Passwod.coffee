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

module.exports = mod


