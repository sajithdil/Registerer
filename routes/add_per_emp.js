define(['sequelize_util/sequelize'],function(seq){
	var addPer = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==20)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var perid = req.params.perid;
			var emp = req.params.empno;
			
			seq.query("INSERT INTO login_permissions(emp_no,PermissionID) VALUES("+emp+","+perid+")").success(function(){
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