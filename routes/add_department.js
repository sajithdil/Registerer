/*
 BL to do PUT for add departmen info
 */

define(['model/ORM_objects/global_ORM'],function (globobj){
//define([],function (){
	var addDepartment = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==14)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var deptName = req.params.deptname;
			
			globobj.departments.findAll({order: 'dept_no DESC', limit: 1}).success(function(c){
				//console.log(departmentsssss[0].dept_no);
				var d = c[0].dept_no.substr(1,5);
				var n = parseInt(d,10)+1;
				console.log(n);
				var deptNo = '';
				if(n<10)
				{
					deptNo = 'd00'+ n;
				}
				else if(n>=10)
				{
					deptNo = 'd0'+ n;
				}
				else if(n>99)
				{
					deptNo = 'd'+ n;
				}
				
				globobj.departments.build({dept_no: deptNo, dept_name:deptName}).save().success(function(resu){
					res.send({message: "Insert Successful"});
				});
			});
			
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return addDepartment;
});
