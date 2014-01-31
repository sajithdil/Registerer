define(['sequelize_util/sequelize'],function(seq){
	var addPer = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==3)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var perid = req.params.perid;
			var emp = req.params.empno;
			
			seq.query("DELETE FROM `login_permissions` WHERE emp_no="+emp+" AND PermissionID="+perid).success(function(){
				res.send({message:"Insert Successful"});
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to remove employees"});
		}
	};
	
	return addPer;
});