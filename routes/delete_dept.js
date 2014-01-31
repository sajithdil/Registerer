/*
 BL to do DELETE for delete department info
 */

define(['model/ORM_objects/global_ORM'],function (globobj){
//define([],function (){
	var delDept = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==17)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var deptID = req.params.deptid;
			globobj.departments.find({where: "dept_no='" + deptID+"'"}).success(function(dept){
			console.log(dept);
				dept.destroy().success(function(){
					res.send({message: "Delete Successful"});
				});
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return delDept;
});
