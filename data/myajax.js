(function () {
    //唯一的顶层变量
    window.ajax = myajax = {}
    myajax.get = function (URL, JSON, callback) {
        //如果不传Json
        if(typeof JSON=="function"){
            callback=JSON;
            JSON={}

        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callback(xhr.responseText)
                }

            } else {

            }
        }
        //拼接字符串
        let arr=[]
        for(var k in JSON){
            arr.push(k+"="+encodeURI(JSON[k]))
        }
        let str=arr.join("&")
        if(str!=""){
            URL+="?aaa="+Date.parse(new Date())+"&"+str
        }
        xhr.open("get", URL, true)
        xhr.send(null)
    }
    myajax.post = function (URL, JSON, callback) {
        //如果不传Json
        if(typeof JSON=="function"){
            callback=JSON;
            JSON={}

        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(xhr.responseText)
                }

            } else {

            }
        }
        //拼接字符串
        let arr=[]
        for(var k in JSON){
            arr.push(k+"="+encodeURI(JSON[k]))
        }
        let str=arr.join("&")
        xhr.open("post", URL, true)
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send(str)
    }

})()