define(['sequelize_util/sequelize'],function(seq){
	var addPer = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==22)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var perid = req.params.perid;
			var role = req.params.roleid;
			
			seq.query("INSERT INTO role_permissions(RoleID,PermissionID) VALUES("+role+","+perid+")").success(function(){
				res.send({message:"Insert Successful"});
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return addPer;
});