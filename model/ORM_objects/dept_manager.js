/*
ORM mapping for dept_manager table
*/

define(['sequelize_util/sequelize','require'],function(seq,require){
	var dept_manager = seq.define('dept_manager',{
		emp_no: {type: seq.INTEGER},
		dept_no: {type: seq.INTEGER},
		from_date: {type: seq.DATE, defaultValue: seq.NOW},
		to_date: {type: seq.DATE, defaultValue: seq.NOW}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	
	//var departments = require('model/ORM_objects/departments');
	//var employees = require('model/ORM_objects/employees');
	
	// the 1..1 backward association between dept_manager <--> dept_manager
	//dept_manager.belongsTo(departments);
	// the 1..1 backward association between dept_manager <--> employees
	//dept_manager.belongsTo(employees);
	
	return dept_manager;
});
