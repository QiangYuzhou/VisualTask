/**
 * Created by 泰佑 on 2016/12/23.
 */

/*
 *  需要补充的函数：
 *      获取用户列表：getUserList()
 *      删除行     : deleteLine(), 同步删除数据库元素
 */

 var searchStr = "";
var pageSize = 10;
var pageNumber;
var lineNumber;
var curruntPage = 1;
var userList = [];
var ButtonNumber = 11;
var data;
var usertype;
window.onload = function () {

    var str = localStorage.getItem("SearchStr");
    localStorage.setItem("SearchStr","");
    if(str != "" && str != null && str != undefined) {
        searchStr = str;
    }
	
	getData();
	usertype = (localStorage.getItem("TYPE") == "true");
}

function getData() {
	 $.ajax({
		type:"GET",
		url:"/getData",
		dataType:"json",
		async:'false',
		success:function(result){
			userList = result;
			getUserList();
            addButton();
			if(searchStr != "" && searchStr != null )
			    findSearchStr();
			addLineToUserTable();
		}
	});
}

function getUserList( ) {

    lineNumber = userList.length;

    clearinputlist();
    setInputList();

    var blankLine = pageSize - lineNumber % pageSize;//wrong

    if (blankLine != pageSize)
        pageNumber = Math.floor((lineNumber + pageSize ) / pageSize);
    else pageNumber = Math.ceil(lineNumber / pageSize);
}

function searchButton() {
    searchStr = document.getElementById("searchBar").value;
    document.getElementById("searchBar").value = "";
    findSearchStr();
    clearTable();
    addLineToUserTable();
}

function clearCheckBox() {
    searchStr = "";
    document.getElementById("searchBar").value = "";
    clearTable();
    addLineToUserTable();
}


function inputCall() {
    var userTable = document.getElementById("userTable");
    searchStr = document.getElementById("searchBar").value;
    if (event.keyCode == 13)
    {
        window.event.returnValue = false;   //禁止刷新页面
        document.getElementById("searchBar").value = "";
        document.getElementById("searchBar").innerHTML = "";
        findSearchStr();
        clearTable();
        addLineToUserTable();

    }
    else {

    }
}

function findSearchStr() {
    var page = 0,i;
    if(userList.length > 0) {
        for(i=0;i<userList.length;i++) {
            if (userList[i].name.indexOf(searchStr) != -1 || userList[i].objectName.indexOf(searchStr) != -1) {
               page = Math.ceil((i + 1) / pageSize);
               break;
            }
        }

        if(page >= 1 && page != curruntPage) {
            curruntPage = page;
            clearButton();
            addButton();
        }
        else if(page == 0) {
            document.getElementById("tip_text").innerHTML = "未检索到相应内容";
            $('#myModal').modal('show');
        }

    }
}

//更新用户显示列表
function addLineToUserTable() {
    var i;
    var userTable = document.getElementById("userTable");
    var begin;
    var end;
    begin = curruntPage * pageSize - pageSize;
    end = curruntPage * pageSize;
    if(end > lineNumber)
        end = lineNumber;
    for (i = begin; i < end; i++) {
        var newRow = userTable.insertRow();
        var newCell0 = newRow.insertCell();
        newCell0.className = "text-center";
        var newCell1 = newRow.insertCell();
        newCell1.className = "text-center";
        var newCell2 = newRow.insertCell();
        newCell2.className = "text-center";
        var newCell3 = newRow.insertCell();
        newCell3.className = "text-center";

        newCell0.width = "15%";
        newCell1.width = "30%";
        newCell2.width = "30%";
        newCell3.width = "25%";

        newCell1.innerHTML = userList[i].name;
        newCell2.innerHTML = userList[i].objectName;

        var a1 = document.createElement("a");

        var Button1 = document.createElement("button");
        Button1.className = "btn btn-primary ButtonMargin";
        Button1.innerHTML = "修改";
        Button1.username = userList[i].name;
        Button1.objectName = userList[i].objectName;

        if(!usertype)
            Button1.disabled = true;
        else {
            Button1.onclick = editline;
            a1.href = "/editUser";
        }
        a1.appendChild(Button1);

        var Button2 = document.createElement("button");
        Button2.className = "btn btn-primary ButtonMargin";
        Button2.innerHTML = "删除";
        Button2.username = userList[i].name;
        Button2.objectName = userList[i].objectName;
        Button2.userNum = i;
        // data-toggle="modal" data-target="#myModal"
        Button2.setAttribute("data-toggle","modal");
        Button2.setAttribute("data-target","#myModal");
        if(!usertype)
            Button2.disabled = true;
        else {
            Button2.onclick = deleteLine;
        }


        newCell3.appendChild(a1);
        newCell3.appendChild(Button2);

        var input0 = document.createElement("input");
        input0.type = "checkbox";
        if(searchStr != "") {
            if (userList[i].name.indexOf(searchStr) != -1 || userList[i].objectName.indexOf(searchStr) != -1) {
                input0.checked = true;
                newRow.className = "success";
            }
        }
        else input0.checked = false;

        var span0 = document.createElement("span");
        span0.innerHTML = i + 1;
        span0.className = "glyphicon";
        newCell0.appendChild(input0);
        newCell0.appendChild(span0);
    }

}

function editline() {
    localStorage.setItem("username",this.username);
    localStorage.setItem("objectname",this.objectName);
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
    var i = this.userNum;
    var userName = userList[i].name;
	$.ajax({
		type:"GET",
		url:"/delete/"+userName,
		dataType:"json",
		async:'false',
		success:function(result){
			if(result.status=="good"){
				clearTable();
				clearButton();
				getData();
				document.getElementById("tip_text").innerHTML = "删除成功";
			}
			else
                document.getElementById("tip_text").innerHTML = "删除失败";
		}
	});

   
}

