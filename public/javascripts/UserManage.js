/**
 * Created by 泰佑 on 2016/12/22.
 */

//重新调整窗口时设置屏幕div在竖直方向上高度为全屏
$(document).ready(function(){
    $(window).resize(function() {
        setFullHeight();
    });
});

window.onload = function () {
    setFullHeight();
 };

function setFullHeight() {
    var fullScreenelement =  document.getElementsByClassName("full_Screen_Height");
    for(var i=0;i<fullScreenelement.length;i++) {
        fullScreenelement[i].setAttribute("style","height: " + window.innerHeight + "px");
    }

    document.getElementById("iframe_manage").setAttribute("style","height: " + Number(window.innerHeight - 13) + "px");
}



