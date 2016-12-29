var mysql=require('mysql');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({entended:false});

var pool=mysql.createPool({
	host:'114.55.113.23',
	user:'zjuteam',
	password:'Team2333!',
	port:'3306',
	database:'ZJUTEAM',
});

var getAllData='select * from userManager';
var insertData='insert into userManager values(?,?,?)';
var updateData='update userManager set password=?,objectName=? where name=?';


module.exports=function(app){
	app.get('/getData',function(req,res){
		pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query(getAllData,function(err,rows){
					if(err)
						console.log(err);
					else
						console.log(rows);
					res.send(rows);
					conn.release();
				});
		});
	});
	app.get('/check/:id',function(req,res){
		var name=req.params.id;
		console.log("id is "+name);
		pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query(getAllData+" where name='"+name+"'",function(err,rows){
					if(err)
						console.log(err);
					else
						console.log(rows);
					if(rows.length)
						res.send(rows);
					else	
						res.send({name:"no_Exist"});
					conn.release();
				});
		});
	});
	app.post('/addSucceed',urlencodedParser,function(req,res){
		var insert=[req.body.name,req.body.password,req.body.objectName];
		pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query(insertData,insert,function(err,rows){
					if(err){
						res.send({status:"bad"});
						console.log(err);
						return;
					}
					console.log(rows);
					res.send({status:"good"});
					conn.release();
				});
		});
	});
	app.get('/delete/:id',function(req,res){
		var name=req.params.id;
		console.log("id is "+name);
		pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query("delete from userManager"+" where name='"+name+"'",function(err,rows){
					if(err){
						res.send({status:"bad"});
						console.log(err);
						return;
					}
					console.log(rows);
					res.send({status:"good"});
					conn.release();
				});
		});
	});
	app.post('/updateSucceed',urlencodedParser,function(req,res){
		var update=[req.body.password,req.body.objectName,req.body.name];
		pool.getConnection(function(err,conn){
			if(err)
				console.log("POOL ==> "+err);
			else
				conn.query(updateData,update,function(err,rows){
					if(err){
						res.send({status:"bad"});
						console.log(err);
						return;
					}
					console.log(rows);
					res.send({status:"good"});
					conn.release();
				});
		});
	});
};


