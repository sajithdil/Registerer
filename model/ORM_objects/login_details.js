/*
ORM mapping for login_details table
*/
define(['sequelize_util/sequelize'], function(seq){
	var login_details = seq.define('login_details',{
		emp_no: {type: seq.INTEGER, primaryKey: true},
		username: {type: seq.STRING, unique: true},
		password: {type: seq.STRING},
		role:{type:seq.INTEGER}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	
	return login_details;
});