fs = require('fs')
multer  = require('multer')


module.exports = (req, res) ->
    new Promise (resolve, reject) ->
        storage = multer.diskStorage(
            destination: (req, file, cb) ->
                cb(null, './upload/')
            filename: (req, file, cb) ->
                if /\/\\/.test(file.originalname)
                    return cb(new Error("filename can\'t include \'\\\' or \'\/\'"))
                
                if fs.existsSync("./upload/#{file.originalname}")
                    return cb(new Error("The file has been uploaded"))
                    
                cb(null, file.originalname)
                null
        )
        upload = multer({ storage: storage }).any()
        upload(req, res, (err) ->
            if(err)
                reject(err)
            else
                resolve(err)
        )


