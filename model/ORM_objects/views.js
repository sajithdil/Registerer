/*
ORM mapping for views table
*/
define(['sequelize_util/sequelize'], function(seq){
	var views = seq.define('views',{
		id: {type: seq.STRING, primaryKey: true},
		views: {type: seq.TEXT},
		PermissionID:{type: seq.INTEGER}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	
	return views;
});