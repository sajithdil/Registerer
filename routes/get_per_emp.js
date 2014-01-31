/*
 BL to do GET for getting the employees for the selected permission
 */

define(['sequelize_util/sequelize'],function (seq){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==3)
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
			
			seq.query("SELECT * FROM employees e INNER JOIN login_permissions l on e.emp_no = l.emp_no WHERE l.PermissionID =" + per).success(function(emp){
				//console.log(emp);
				seq.query("SELECT COUNT(*) FROM employees e INNER JOIN login_permissions l on e.emp_no = l.emp_no WHERE l.PermissionID =" + per).success(function(c){
					var row = new Array();
					var cou=0;
					try{
						emp.forEach(function(val){
							var temp = {"emp_no": val.emp_no, "last_name": val.last_name, "first_name": val.first_name,"gender": val.gender, "hire_date": val.hire_date, "birth_date": val.birth_date};
						
							row[cou]=temp;
							cou++;
						});
					}catch(e)
					{
						var temp = {"emp_no": emp.emp_no, "last_name": emp.last_name, "first_name": emp.first_name,"gender": emp.gender, "hire_date": emp.hire_date, "birth_date": emp.birth_date};
						
						row[cou]=temp;
						cou++;
					}
					
					var js = {'total':c, 'max':noOfRows,'page':page,'rows': row};
					//console.log(js);
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
