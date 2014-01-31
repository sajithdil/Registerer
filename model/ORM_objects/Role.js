/*
ORM mapping for role table
*/
define(['sequelize_util/sequelize'], function(seq){
	var role = seq.define('role',{
		RoleID: {type: seq.INTEGER, primaryKey: true},
		RoleName: {type: seq.TEXT}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	
	return role;
});