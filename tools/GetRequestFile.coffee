mod = (body) ->
    Arr = body.match(/Content-Type\:.*?boundary=-*(.*;?)+/)
    reg =
    """
    \n-*#{Arr[1]}[\\s\\S]*?filename=\"(.*)\"[\\s\\S]*?(?:Content-Type:.*)([\\s\\S]*?)-*#{Arr[1]}--
    """
    reg = new RegExp(reg)
    if /[^0-9a-z\-]/.test(Arr[1])
        return new Error("unexpected token")
    body.match(reg)
module.exports = mod