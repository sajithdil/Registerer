define(['model/ORM_objects/global_ORM'],function (orm){
	var roleDet = function(req, res){

		
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==8)
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
			
			orm.role.count().success(function(c){
			orm.role.findAll({limit: noOfRows, offset:off}).success(function(dept){
				var row = new Array();;
				var cou=0;
				dept.forEach(function(val){
					
					var temp = {"RoleID": val.RoleID, "RoleName": val.RoleName};
					
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
	
	return roleDet;
});
