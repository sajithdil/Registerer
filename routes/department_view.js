/*
 BL to do GET for getting the Department view
 */

define(['model/ORM_objects/global_ORM'],function (orm_obj){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==13)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			orm_obj.views.find({where: "id='Department'"}).success(function(val){
				res.send(val);
			});
		}
		else
		{
			res.send({error: "You do not have permission to access this view"});
		}
	};
	
	return editEmp;
});
