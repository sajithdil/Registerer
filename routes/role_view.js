/*
 BL to do GET for getting the Role view
 */

define(['model/ORM_objects/global_ORM'],function (orm_obj){
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
		{
			orm_obj.views.find({where: "id='Role'"}).success(function(val){
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
