/*
 BL to do GET for edit other employees info
 */

define(['model/edit_dept'],function (edit_dept){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==15)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var deptid = req.params.deptid;
			var deptname = req.params.deptname;			
			
			edit_dept(deptid, deptname, res);
		}
		else
		{
			res.send({error: "You do not have permission to update your data"});
		}
	};
	
	return editEmp;
});
