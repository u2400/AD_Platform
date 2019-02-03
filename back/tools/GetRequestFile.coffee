mod = (body) ->
    Arr = body.match(/Content-Type\:.*?boundary=-*(.*;?)+/)
    #the first step results into a regular expression
    #Determine whether it is a file based on whether there is filename
    if Arr
        reg = """
        \n-*#{Arr[1]}[\\s\\S]*?filename=\"(.*)\"[\\s\\S]*?(?:Content-Type:.*)([\\s\\S]*?)-*#{Arr[1]}
        """
        reg = new RegExp(reg) #Make a second match to get the file contents
        
        if /[^0-9a-z\-]/.test(Arr[1])
            new Error("unexpected token")
            
        result = body.match(reg)
        Obj =
        file_name: result[1]
        file_content: result[2]
    else
        Obj = null
    Obj
module.exports = mod