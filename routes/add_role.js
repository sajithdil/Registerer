/*
 BL to do PUT for add role info
 */

define(['model/ORM_objects/global_ORM'],function (globobj){
//define([],function (){
	var addRole = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==9)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var roleName = req.params.rolename;
			
			globobj.role.max('RoleID').success(function(c){
			
				var RoleID = parseInt(c)+1;
				globobj.role.create({RoleID: RoleID, RoleName:roleName}).success(function(resu){
				res.send({message: "Insert Successful"});
			});
			})
			
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return addRole;
});
