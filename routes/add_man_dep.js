define(['sequelize_util/sequelize'],function(seq){
	var addPer = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==27)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			//console.log("fired here");
			var deptid = req.params.deptid;
			var emp = req.params.empno;
			//var start = req.params.start;
			//var end = req.params.end;
			var start = req.query['start'];
			var end = req.query['end'];
			
			seq.query("INSERT INTO dept_manager(emp_no,dept_no,from_date,to_date) VALUES("+emp+",'"+deptid+"','"+start+"','"+end+"')").success(function(){
				res.send({message:"Insert Successful"});
			}).error(function(e){
				console.log(e);
			});
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return addPer;
});