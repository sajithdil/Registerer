/*
ORM mapping for login_permissions table
*/
define(['sequelize_util/sequelize'], function(seq){
	var login_permissions = seq.define('login_permissions',{
		emp_no: {type: seq.INTEGER},
		PermissionID:{type: seq.INTEGER}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	
	return login_permissions;
});