define(['model/ORM_objects/global_ORM'],function (orm){
	var deptDet = function(req, res){

		
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==13)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var page = parseInt(req.query["page"]);
			var noOfRows = parseInt(req.query["max"]);
			
			var off = 0;
			if(page != 1)
			{
				off = (page*noOfRows) - noOfRows;
			}
			
			orm.departments.count().success(function(c){
			orm.departments.findAll({limit: noOfRows, offset:off}).success(function(dept){
				var row = new Array();;
				var cou=0;
				dept.forEach(function(val){
					
					var temp = {"dept_no": val.dept_no, "dept_name": val.dept_name};
					
					row[cou]=temp;
					cou++;
				});
				
					//console.log(20);
					var js = {'total':c, 'max':noOfRows,'page':page,'rows': row};
					
					//console.log(js);
					
					res.send(js);
			});
		});
		}
		else
		{
			res.send({error: "You do not have permission to update your data"});
		}
		
		
		
		
		
		//var js = {total:c, max:10,page:1,rows[[{},{},{}]};
	};
	
	return deptDet;
});
