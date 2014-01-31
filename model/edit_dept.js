define(['model/ORM_objects/global_ORM'],function(globalObj){
	var editDept = function(deptID, deptName, res)
	{
		globalObj.departments.find({where:"dept_no='" + deptID + "'"}).success(function(dept){
			dept.updateAttributes({dept_name: deptName}).success(function(results){
				res.send(results);
			})
			.error(function(e){
				console.log("Error updateing deptartment: " + e );
				res.send({message: "Error updating employee"});
			});
		})
		.error(function(e){
			console.log("Error finding department: " + e );
			res.send({message: "Error finding department"});
		});
	}
	
	return editDept;
});