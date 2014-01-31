
/*
 BL to GET myinfo page.
 */

define(['model/ORM_objects/global_ORM'],function (orm_obj){
	var login = function(req, res){
		
		var id = req.params.id;
		
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==1)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			orm_obj.views.find({where: "id='home'"}).success(function(view){
				
				    //console.log(view);
					
				
				orm_obj.employees.find({where: 'emp_no='+id}).success(function(empl){
					var js = {'view': view, 'employee': empl};
					//console.log(js.emp_no);
					
					res.send(js);
				});
	
				});
		
		}
		else
		{
			res.send({error: "You do not have permission to access this view"});
		}
		
		
		
	};
	
	return login;
});
