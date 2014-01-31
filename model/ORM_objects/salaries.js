/*
ORM mapping for salaries table
*/

define(['sequelize_util/sequelize','require'],function(seq,require){
	var Salary = seq.define('salaries',{
		emp_no: {type: seq.INTEGER},
		salary: {type: seq.INTEGER},
		from_date: {type: seq.DATE, defaultValue: seq.NOW},
		to_date: {type: seq.DATE, defaultValue: seq.NOW}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	//var employees = require('model/ORM_objects/employees');
	
	// the 1..1 backward association between Salary <--> employees
	//Salary.belongsTo(employees);
	
	return Salary;
});
