/*
 BL to do GET for getting the employees for the selected permission
 */

define(['sequelize_util/sequelize'],function (seq){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==8)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{	var page = parseInt(req.query["page"]);
			var per = req.params.perid;
			var noOfRows = parseInt(req.query["max"]);
			var field = req.query["searchField"];
			var off = 0;
			if(page != 1)
			{
				off = (page*noOfRows) - noOfRows;
			}
			
			seq.query("SELECT * FROM role e INNER JOIN role_permissions l on e.RoleID = l.RoleID WHERE l.PermissionID =" + per).success(function(r){
				//console.log(emp);
				seq.query("SELECT COUNT(*) FROM role e INNER JOIN role_permissions l on e.RoleID = l.RoleID WHERE l.PermissionID =" + per).success(function(c){
					var row = new Array();;
					var cou=0;
					r.forEach(function(val){
					
						var temp = {"RoleID": val.RoleID, "RoleName": val.RoleName};
					
						row[cou]=temp;
						cou++;
					});
					
					var js = {'total':c, 'max':noOfRows,'page':page,'rows': row};
					console.log(js);
					res.send(js);
				});
			});
		}
		else
		{
			res.send({error: "You do not have permission to access this view"});
		}
	};
	
	return editEmp;
});
