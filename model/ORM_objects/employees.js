/*
ORM mapping for employees table
*/

define(['sequelize_util/sequelize','require'], function (seq,require) {


	var Employee = seq.define('employees', {
		//emp_no is the primary key for this table
		emp_no: {type: seq.INTEGER, primaryKey: true, autoIncrement: true},
		birth_date: {type: seq.DATE, defaultValue: seq.NOW},
		first_name: {type: seq.STRING, defaultValue: ""},
		last_name: {type: seq.STRING, defaultValue: ""},
		gender: {type: seq.STRING, defaultValue: ""},
		hire_date: {type: seq.DATE, defaultValue: seq.NOW}
	},{
		timestamps :false,
		freezeTableName:true,
		classMethods: {
			testM: function(){ console.log('test'); },
			UnauthSearch:function(){
				seq.query('call sp',this).onSuccess(function(result){
					console.log(result);
					
					return result;
				});
			}
		}	
	}
		
	);
	
	//console.log(dept_emp);
	
	//var dept_emp = require('model/ORM_objects/dept_emp');
	//var dept_manager = require('model/ORM_objects/dept_manager');
	//var salaries = require('model/ORM_objects/salaries');
	//var titles = require('model/ORM_objects/titles');
	
	/*
	the foreign key that has been set the index 
	that was created by the migrations for this table
	(format of name: tableName_firstAttributeOfIndex_secondAttributeOfIndex_thirdAttributeOfIndexIfItExists)
	*/
	
	
	//1..* relationship between Employees <--> dept_emp
	//Employee.hasMany(dept_emp,{as: 'DepartmentEmployees', foreignKey:'dept_emp_emp_no_dept_no'});
	
	//1..* relationship between Employees <--> dept_managers
	//Employee.hasMany(dept_manager,{as: 'DepartmentManagers', foreignKey:'dept_manager_dept_no_emp_no'});
	
	//1..* relationship between Employees <--> salaries
	//Employee.hasMany(salaries,{as: 'Salaries', foreignKey:'salaries_emp_no_from_date'});
	
	//1..* relationship between Employees <--> titles
	//Employee.hasMany(salaries,{as: 'Salaries', foreignKey:'titles_emp_no_title_from_date'});
	return Employee;
});

//Sequelize does not allow setting custom sozes for VARCHAR values.
//Sequelize converts STRING into VARCHAR(255) 