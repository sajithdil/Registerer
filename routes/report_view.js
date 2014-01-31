/*
 BL to do GET for getting the report view
 */

define(['model/ORM_objects/global_ORM'],function (orm_obj){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==1)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			orm_obj.views.find({where: "id='Report'"}).success(function(val){
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
