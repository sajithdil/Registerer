/*
ORM mapping for dept_emp table
*/

define(['sequelize_util/sequelize','require'],function(seq,require){
	var dept_emp = seq.define('dept_emp',{
		emp_no: {type: seq.INTEGER},
		dept_no: {type: seq.INTEGER},
		from_date: {type: seq.DATE, defaultValue: seq.NOW},
		to_date: {type: seq.DATE, defaultValue: seq.NOW}
		
	},{
		timestamps :false,
		freezeTableName:true
	});
	
	/*
	due to circular dependencies requirejs is unable 
	to get the required ORM_objects at the definition point of the function
	therefore it is called below as needed
	*/
	
	//var departments = require('model/ORM_objects/departments');
	//var employees = require('model/ORM_objects/employees');
	
	// the 1..1 backward association between dept_emp <--> departments
	//dept_emp.belongsTo(departments);
	// the 1..1 backward association between dept_emp <--> employees
	//dept_emp.belongsTo(employees);
	
	return dept_emp;
});
