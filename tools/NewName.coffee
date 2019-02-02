mod = (requests) ->
    name = ""
    name += (requests.ser_ip + "-")
    name += (requests.time + "-")
    name += (requests.method)
    
    if requests.file != null
        name += ("-file")

module.exports = mod