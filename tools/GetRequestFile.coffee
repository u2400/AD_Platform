mod = (body) ->
    Arr = body.match(/Content-Type\:.*?boundary=-*(.*;?)+/)
    reg = #将第一步获取的结果拼接进正则表达式
    """
    \n-*#{Arr[1]}[\\s\\S]*?filename=\"(.*)\"[\\s\\S]*?(?:Content-Type:.*)([\\s\\S]*?)-*#{Arr[1]}--
    """ #根据是否有filename判断是否是文件内容
    reg = new RegExp(reg) #进行第二次匹配,获取文件内容
    if /[^0-9a-z\-]/.test(Arr[1])
        return new Error("unexpected token")
    body.match(reg)
module.exports = mod