define(['model/ORM_objects/global_ORM'],function(globalObj){
	var editDept = function(roleID, rName, res)
	{

		globalObj.role.find({where:'RoleID=' + roleID}).success(function(role){
			role.updateAttributes({RoleName: rName}).success(function(results){
			/*console.log(roleName);
			console.log(results);*/
				res.send(results);
			})
			.error(function(e){
				console.log("Error updateing role: " + e );
				res.send({message: "Error updating role"});
			});
		})
		.error(function(e){
			console.log("Error finding role: " + e );
			res.send({message: "Error finding role"});
		});
	}
	
	return editDept;
});