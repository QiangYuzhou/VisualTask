/**
 * Created by 泰佑 on 2016/12/24.
 */

window.onload = function () {

    userName = localStorage.getItem("username");
    objectName = localStorage.getItem("objectname");

    document.getElementById("userName").value = userName;
    document.getElementById("projectName").value = objectName;


}
var userName;
var objectName;

function editUser() {
    resetColor();
    var password1 = document.getElementById("passWord1").value;
    var password2 = document.getElementById("passWord2").value;
    var projectname = document.getElementById("projectName").value;
    if(projectname == "") {
        document.getElementById("projectNameDiv").className = "form-group has-error";
        document.getElementById("projectNameLabel").innerHTML = "未填写项目名";
    }
    else if(password1 == "") {
        document.getElementById("passWord1Div").className = "form-group has-error";
        document.getElementById("passWord1Label").innerHTML = "未输入密码";
    }
    else if(password2 == "") {
        document.getElementById("passWord2Div").className = "form-group has-error";
        document.getElementById("passWord2Label").innerHTML = "未输入确认密码";
    }
    else if(password1 != password2) {
        document.getElementById("passWord1Div").className = "form-group has-error";
        document.getElementById("passWord2Div").className = "form-group has-error";
        document.getElementById("passWord2Label").innerHTML = "两次输入密码不同";
    }
    else {
        alert("用户" + userName + "修改成功！");
        resetColor();
    }
}

function resetColor() {
    document.getElementById("projectNameDiv").className = "form-group";
    document.getElementById("passWord1Div").className = "form-group";
    document.getElementById("passWord2Div").className = "form-group";
    document.getElementById("projectNameLabel").innerHTML = "";
    document.getElementById("passWord1Label").innerHTML = "";
    document.getElementById("passWord2Label").innerHTML = "";
}

function clear() {
    document.getElementById("passWord1").value = "";
    document.getElementById("passWord2").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("projectName").value = "";
}