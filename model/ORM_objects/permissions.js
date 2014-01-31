/*
ORM mapping for permissions table
*/
define(['sequelize_util/sequelize'], function(seq){
	var per = seq.define('permissions',{
		PermissionID: {type: seq.INTEGER, primaryKey: true},
		PermissionName: {type: seq.TEXT},
		MainPermission: {type: seq.INTEGER},
		extra:{type: seq.STRING}
	},{
		timestamps :false,
		freezeTableName:true,
		classMethods:{ getPermissions: function(emp_no,roleID, cb){
		seq.query("call getPermission("+emp_no+","+roleID+")",this).success(cb).error(function(e){
			console.log(e);
		});}
			
		}
	});
	
	
	return per;
});