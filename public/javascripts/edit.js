/**
 * Created by 泰佑 on 2016/12/24.
 */

window.onload = function () {

    userName = localStorage.getItem("currunt_user_name");
    document.getElementById("userName").value = userName;
    getData();
}


var searchStr;
var userList = [];

function getData() {
    $.ajax({
        type:"GET",
        url:"/getData",
        dataType:"json",
        async:'false',
        success:function(result){
            userList = result;
            clearinputlist();
            setInputList();
        }
    });
}

function inputCall() {
    searchStr = document.getElementById("searchBar").value;
    if (event.keyCode == 13)
    {
        window.event.returnValue = false;   //禁止刷新页面
        if(searchStr != "") {
            localStorage.setItem("SearchStr", searchStr);
            window.location.href = "/Manage";
        }
    }
    else {

    }
}

function setInputList() {
    var inputlist = document.getElementById("inputlist");
    inputlist.async = true;
    var i;
    var option1,option2;
    for(i = 0; i < userList.length;i++) {

        option1 = document.createElement("option");
        option1.innerHTML = userList[i].name;
        inputlist.appendChild(option1);


        option2 = document.createElement("option");
        option2.innerHTML = userList[i].objectName;
        inputlist.appendChild(option2);


    }
}

function clearinputlist() {
    var inputlist = document.getElementById("inputlist");
    inputlist.innerHTML = "";
}

function searchButton() {
    searchStr = document.getElementById("searchBar").value;
    if(searchStr != "") {
        localStorage.setItem("SearchStr", searchStr);
        window.location.href = "/Manage";
    }
}

function clearCheckBox() {
    document.getElementById("searchBar").value = "";
}


var userName;

function editUser() {
    resetColor();
    var password1 = document.getElementById("passWord1").value;
    var password2 = document.getElementById("passWord2").value;
    var projectname = document.getElementById("projectName").value;
    var succeed = true;

    if(password1 == "") {
        document.getElementById("passWord1Div").className = "form-group has-error";
        document.getElementById("passWord1Label").innerHTML = "未输入密码";
        succeed = false;
    }
    else if(password2 == "") {
        document.getElementById("passWord2Div").className = "form-group has-error";
        document.getElementById("passWord2Label").innerHTML = "未输入确认密码";
        succeed =false;
    }
    else if(password1 != password2) {
        document.getElementById("passWord1Div").className = "form-group has-error";
        document.getElementById("passWord2Div").className = "form-group has-error";
        document.getElementById("passWord2Label").innerHTML = "两次输入密码不同";
        succeed =false;
    }

    if(succeed) {
        $.ajax({
            type:"POST",
            url:"/updateSucceed",
            data:{name:userName,password:password1,objectName:projectname},
            success: alert("用户" + userName + "修改成功！"),
            dataType:"json"
        });
        resetColor();
    }
}

function resetColor() {
    document.getElementById("passWord1Div").className = "form-group";
    document.getElementById("passWord2Div").className = "form-group";
    document.getElementById("passWord1Label").innerHTML = "";
    document.getElementById("passWord2Label").innerHTML = "";
}

function clear() {
    document.getElementById("passWord1").value = "";
    document.getElementById("passWord2").value = "";
}