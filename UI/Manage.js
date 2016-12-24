/**
 * Created by 泰佑 on 2016/12/23.
 */

/*
 *  需要补充的函数：
 *      获取用户列表：getUserList()
 *      删除行     : deleteLine(), 同步删除数据库元素
 */

window.onload = function () {

    getUserList();

    addLineToUserTable();
    addButton();
}

var pageNumber;
var lineNumber;
var curruntPage = 1;
var userList = [];
var ButtonNumber = 9;

function getUserList( ) {
    var i, user;

    for (i = 0; i < 200; i++) {
        user = {};
        user.name = "username" + i;
        user.objectName = "objectName" + i;
        user.password = "password";
        userList[i] = user;
    }

    lineNumber = userList.length;

    var blankLine = lineNumber % 10;
    for (i = 0; i < blankLine; i++) {
        user = {};
        user.name = " ";
        user.objectName = " ";
        user.password = " ";
        userList[lineNumber + i] = user;
    }
    if (blankLine != 0)
        pageNumber = (lineNumber + 10 - blankLine) / 10;
    else pageNumber = lineNumber / 10;
}

//更新用户显示列表
function addLineToUserTable() {
    var i;
    var userTable = document.getElementById("userTable");
    for (i = curruntPage * 10 - 10; i < curruntPage * 10; i++) {
        var newRow = userTable.insertRow();
        var newCell0 = newRow.insertCell();
        newCell0.className = "text-center";
        var newCell1 = newRow.insertCell();
        newCell1.className = "text-center";
        var newCell2 = newRow.insertCell();
        newCell2.className = "text-center";
        var newCell3 = newRow.insertCell();
        newCell3.className = "text-center";

        var input0 = document.createElement("input");
        input0.type = "checkbox";
        var span0 = document.createElement("span");
        span0.innerHTML = i + 1;
        span0.className = "glyphicon";
        newCell0.appendChild(input0);
        newCell0.appendChild(span0);

        newCell1.innerHTML = userList[i].name;
        newCell2.innerHTML = userList[i].objectName;

        var a1 = document.createElement("a");
        a1.href = "editUser.html";
        var Button1 = document.createElement("button");
        Button1.className = "btn btn-primary ButtonMargin";
        Button1.innerHTML = "修改";
        a1.appendChild(Button1);

        var Button2 = document.createElement("button");
        Button2.className = "btn btn-primary ButtonMargin";
        Button2.innerHTML = "删除";
        Button2.onclick = deleteLine;
        Button2.userNum = i;

        newCell3.appendChild(a1);
        newCell3.appendChild(Button2);


    }

}

function clearButton() {
    var buttonDiv = document.getElementById("buttonBar");
    buttonDiv.innerHTML = "";
}

function addButton() {
    createButton("首页", "firstPageButton", 0);
    createButton("上一页", "lastPageButton", 1);

    setPageNumberButton();

    createButton("下一页", "nextPageButton", 2);
    createButton("尾页", "endPageButton", 3);
}

function setPageNumberButton() {
    var num1 = Math.ceil(ButtonNumber / 2);
    var num2 = pageNumber - num1;
    var i, name;

    if (pageNumber < ButtonNumber) {
        for (i = 1; i <= pageNumber; i++) {
            if(i < 10 )
                name = "0" + i;
            else
                name = i;
            if (i == curruntPage)
                createCurrentButton(name, i + "button" , i);
            else
                createButton(name, i + "button", 4 , i);
        }
    }
    else {
        if (curruntPage <= num1) {
            for (i = 1; i <= ButtonNumber; i++) {
                if(i < 10 )
                    name = "0" + i;
                else
                    name = i;
                if (i == curruntPage)
                    createCurrentButton(name, i + "button",i);
                else
                    createButton(name, i + "button", 4 , i);
            }
        }
        else if (curruntPage > num2) {
            for (i = pageNumber - ButtonNumber + 1; i <= pageNumber; i++) {
                if(i < 10 )
                    name = "0" + i;
                else
                    name = i;
                if (i == curruntPage)
                    createCurrentButton(name, i + "button" , i);
                else
                    createButton(name, i + "button", 4 , i);
            }
        }
        else {
            for (i = curruntPage - num1 + 1; i < curruntPage + num1 ; i++) {
                if(i < 10 )
                    name = "0" + i;
                else
                    name = i;
                if (i == curruntPage)
                    createCurrentButton(name, i + "button" , i);
                else
                    createButton(name, i + "button", 4 , i);
            }
        }
    }
}


function createCurrentButton(name, id, page) {
    var buttonDiv = document.getElementById("buttonBar");
    var Button = document.createElement("button");
    Button.className = "btn btn-primary ButtonMargin";
    Button.innerHTML = name;
    Button.id = id;
    buttonDiv.appendChild(Button);
}

function createButton(name, id, type, page) {
    var buttonDiv = document.getElementById("buttonBar");
    var Button = document.createElement("button");
    Button.className = "btn btn-default ButtonMargin";
    Button.innerHTML = name;
    Button.id = id;
    switch (type) {
        case 0:
            Button.onclick = toFirstPage;
            break;
        case 1:
            Button.onclick = toLastPage;
            break;
        case 2:
            Button.onclick = toNextPage;
            break;
        case 3:
            Button.onclick = toEndPage;
            break;
        case 4:
            Button.onclick = function () {
                if(curruntPage != page) {
                    curruntPage = page;
                    clearTable();
                    addLineToUserTable();
                    clearButton();
                    addButton();
                }
            };
            break;
    }
    buttonDiv.appendChild(Button);
}


function toFirstPage() {
    curruntPage = 1;
    clearTable();
    addLineToUserTable();
    clearButton();
    addButton();
}

function toEndPage() {
    curruntPage = pageNumber;
    clearTable();
    addLineToUserTable();
    clearButton();
    addButton();
}

function toLastPage() {
    if (curruntPage > 1) {
        curruntPage--;
        clearTable();
        addLineToUserTable();
    }
    clearButton();
    addButton();
}

function toNextPage() {
    if (curruntPage < pageNumber) {
        curruntPage++;
        clearTable();
        addLineToUserTable();
    }
    clearButton();
    addButton();
}

function clearTable() {
    var userTable = document.getElementById("userTable");
    var rowNum = userTable.rows.length;
    var i;
    for (i = 1; i < rowNum; i++) {
        userTable.deleteRow(i);
        rowNum = rowNum - 1;
        i = i - 1;
    }
}

function deleteLine() {

    var userNum = this.userNum;
    var userName = userList[i].name;

    /**
     * 删除元素的操作
     */

    clearTable();
    getUserList();
    addLineToUserTable();
    clearButton();
    addButton();
}

