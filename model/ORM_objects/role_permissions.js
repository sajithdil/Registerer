/*
ORM mapping for role_permissions table
*/
define(['sequelize_util/sequelize'], function(seq){
	var role_permissions = seq.define('role_permissions',{
		RoleID: {type: seq.INTEGER},
		PermissionID:{type: seq.INTEGER}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	
	return role_permissions;
});