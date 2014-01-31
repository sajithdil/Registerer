define(['sequelize_util/sequelize'],function(seq){
	var addPer = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==8)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var perid = req.params.perid;
			var role = req.params.roleid;
			
			seq.query("DELETE FROM `role_permissions` WHERE RoleID="+role+" AND PermissionID="+perid).success(function(){
				res.send({message:"Delete Successful"});
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to remove roles"});
		}
	};
	
	return addPer;
});