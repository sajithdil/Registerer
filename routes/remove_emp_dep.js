define(['sequelize_util/sequelize'],function(seq){
	var addPer = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==13)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var deptid = req.params.deptid;
			var emp = req.params.empid;
			
			seq.query("DELETE FROM `dept_emp` WHERE emp_no="+emp+" AND dept_no='"+deptid+"'").success(function(){
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