/*
 BL to do GET for getting the salary
 */

define(['model/ORM_objects/global_ORM'],function (global_obj){
//define([],function (){
	var editEmp = function(req, res){
	
		var off = req.params.offset;
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==2)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			global_obj.salaries.findAll({limit:10, offset: off}).success(function(results){
				res.send(results);
			});
		}
		else
		{
			res.send({error: "You do not have permission to access this view"});
		}
	};
	
	return editEmp;
});
