/*
 BL to do GET for edit role info
 */

define(['model/edit_role'],function (edit_role){
//define([],function (){
	var editRole = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==10)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var roleID = req.params.roleid; 
			var roleName = req.params.rolename;
			
			edit_role(roleID, roleName, res);
		}
		else
		{
			res.send({error: "You do not have permission to update your data"});
		}
	};
	
	return editRole;
});
