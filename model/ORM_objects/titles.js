/*
ORM mapping for titles table
*/

define(['sequelize_util/sequelize','require'],function(seq,require){
	var Titles = seq.define('titles',{
		emp_no: {type: seq.INTEGER,},
		title: {type: seq.STRING, defaultValue: ""},
		from_date: {type: seq.DATE, defaultValue: seq.NOW},
		to_date: {type: seq.DATE, defaultValue: seq.NOW}
		
	},{
		timestamps :false,
		freezeTableName:true
	});

	//var employees = require('model/ORM_objects/employees');
	
	// the 1..1 backward association between Titles <--> employees
	//Titles.belongsTo(employees);
	
	return Titles;
});
