/*
 BL to do GET for getting the update employee view
 */

define(['model/get_update_empView'],function (get_view){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==3)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			get_view.getUpdateEmpView(req.session.emp_no,res);
		}
		else
		{
			res.send({error: "You do not have permission to access this view"});
		}
	};
	
	return editEmp;
});
