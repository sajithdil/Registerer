/*
ORM mapping for dept_manager table
*/

define(['sequelize_util/sequelize','require'], function(seq,require){
	var departments = seq.define('departments',{
		dept_no: {type: seq.STRING, defaultValue: "", primaryKey: true},
		dept_name: {type: seq.DATE, defaultValue: seq.NOW}
	},{
		timestamps :false,
		freezeTableName:true
	});
	//console.log(dept_emp);
	
	//var dept_emp = require('model/ORM_objects/dept_emp');
	//var dept_manager = require('model/ORM_objects/dept_manager');
	
	/*
	the foreign key that has been set the index 
	that was created by the migrations for this table
	(format of name: tableName_firstAttributeOfIndex_secondAttributeOfIndex)
	*/
	//1..* relationship between departments <--> dept_emp 
	//departments.hasMany(dept_emp,{as: 'Employees', foreignKey:'dept_emp_emp_no_dept_no'});
	//1..* relationship between departments <--> dept_manager 
	//departments.hasMany(dept_manager,{as: 'Managers', foreignKey:'dept_manager_dept_no_emp_no'});
	
	return departments;
});