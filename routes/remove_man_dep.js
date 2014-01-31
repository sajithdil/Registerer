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
			//console.log("fired here")
			seq.query("DELETE FROM `dept_manager` WHERE emp_no="+emp+" AND dept_no='"+deptid+"'").success(function(){
				res.send({message:"Insert Successful"});
			}).error(function(e){
				console.log(e);
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to remove employees"});
		}
	};
	
	return addPer;
});