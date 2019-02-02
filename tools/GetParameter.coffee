mod = (body) ->
    Arr = body.match(/Content-Length\:.*?\n\n(.*)/)
    if !Arr
        return []
    Arr = Arr[1].split("&")
    Par = {}
    Arr.forEach((str) ->
        arr = str.match(/^(.*?)=(.*?)$/)
        Par[arr[1]] = arr[2]
    )
    ret = [Par, Arr]
module.exports = mod