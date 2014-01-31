/*
 BL to do DELETE for delete role info
 */

define(['model/ORM_objects/global_ORM'],function (globobj){
//define([],function (){
	var delRole = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==12)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var roleID = req.params.roleid;
			globobj.role.find({where: "RoleID=" + roleID}).success(function(role){
				role.destroy().success(function(){
					res.send({message: "Delete Successful"});
				});
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return delRole;
});
