module.exports = {
  up: function(migration, DataTypes) {
    // add altering commands here
	
	migration.addIndex('titles',['emp_no','title','from_date'],
	{
		indicesType:'UNIQUE' 
	});
  },
  down: function(migration) {
    // add reverting commands here
  }
}