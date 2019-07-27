
let mainTable=document.getElementsByClassName('main-table')[0]
//模板字符串
let templateString=document.getElementById('templateBox').innerHTML
//模板编译函数
let compileFunction=_.template(templateString)

function TableBd(result) {
    this.dom=document.createElement('div')
    mainTable.appendChild(this.dom)
    this.dom.className="table-bd"
    this.result=result

    //从获取的信息里提取自己想要的信息
    if(this.result.postType.indexOf("-")!=-1){

        this.result.postType=this.result.postType.replace(/.*\-[A-Z](.*)\-.*/g,function (match,$1,$2) {
            return $1
        })
    }
    this.dom.innerHTML=compileFunction(this.result)
    this.bindEvent()
}
TableBd.prototype.bindEvent=function(){
    this.toggleBtn=this.dom.getElementsByClassName("down-btn")[0]
    this.info=this.dom.getElementsByClassName("info")[0]
    this.clock=false
    let that=this
    this.toggleBtn.onclick=function () {
        that.clock=!that.clock
        if(that.clock){
            that.toggleBtn.classList.add('up')
            that.info.style.display="block"
        }else {
            that.toggleBtn.classList.remove('up')
            that.info.style.display="none"
        }

    }
}
myajax.get('data/position.json',function (data) {
    let dataObj=eval("("+data+")")
    let count=document.getElementsByClassName('count')[0]
    //获取的数量
    count.innerHTML=dataObj.rowCount
    //遍历字典
    _.each(dataObj.postList,function (result) {
        new TableBd(result)
    })
})