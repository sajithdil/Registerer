define(['model/ORM_objects/global_ORM'],function (orm){
	var perDet = function(req, resp){

		
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==1)
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
			orm.permission.count().success(function(c){
				orm.permission.findAll({limit: noOfRows, offset:off}).success(function(res){
					var row = new Array();
					var cou=0;
					res.forEach(function(val){
						//console.log(res.PermissionID + " , " + res.PermissionName);
						var temp = {"PermissionID": val.PermissionID, "PermissionName": val.PermissionName, "MainPermission": val.MainPermission,"extra": val.extra};
					
						row[cou]=temp;
						cou++;
					});
					var js = {'total':c, 'max':noOfRows,'page':page,'rows': row};
					
						//console.log(js);
					
					resp.send(js);
				});
			});
		}
		else
		{
			resp.send({error: "You do not have permission to update your data"});
		}
		
	};
	
	return perDet;
});
