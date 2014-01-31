module.exports = {
  up: function(migration, DataTypes) {
    // add altering commands here
	migration.addIndex('dept_emp',['emp_no','dept_no'],
	{
		indicesType:'UNIQUE' 
	});
	migration.addIndex('salaries',['emp_no','from_date'],{
		indicesType:'UNIQUE'
	});
	migration.addIndex('dept_manager',['dept_no','emp_no'],{
		indicesType:'UNIQUE'
	});
	/*migration.addIndex('',['',''],{
		indicesType:'UNIQUE'
	});
	migration.addIndex('',['',''],{
		indicesType:'UNIQUE'
	});*/
  },
  down: function(migration) {
    // add reverting commands here
	
	migration.removeIndex('dept_emp'['emp_no','dept_no']);
	migration.removeIndex('salaries',['emp_no','from_date']);
	migration.removeIndex('dept_manager',['dept_no','emp_no']);
	/*migration.removeIndex('',['','']);
	migration.removeIndex('',['','']);*/
  }
}