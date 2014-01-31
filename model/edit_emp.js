define(['model/ORM_objects/global_ORM'],function(globalObj){
	var editEmp = function(empNo, lastName, firstName, empGender, hireDate, birthDate, res)
	{

		globalObj.employees.find({where:'emp_no=' + empNo}).success(function(emp){
			emp.updateAttributes({last_name: lastName, first_name: firstName, 
			gender: empGender, hire_date:hireDate, birth_date:birthDate}).success(function(results){
				res.send(results);
			})
			.error(function(e){
				console.log("Error updateing employee: " + e );
				res.send({message: "Error updating employee"});
			});
		})
		.error(function(e){
			console.log("Error finding employee: " + e );
			res.send({message: "Error finding employee"});
		});
	}
	
	return editEmp;
});