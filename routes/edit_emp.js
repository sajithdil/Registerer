/*
 BL to do GET for edit employees info
 */

define(['model/edit_emp'],function (edit_emp){
//define([],function (){
	var editEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==5)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var empNo = req.params.id; 
			var lastName = req.params.lastname;
			var firstName = req.params.firstname;
			var gender = req.params.gender;
			var hireDate = req.params.hiredate;
			var birthDate = req.params.birthdate;
			
			//console.log(firstName);
			
			edit_emp(empNo, lastName, firstName, gender, hireDate, birthDate,res);
		}
		else
		{
			res.send({error: "You do not have permission to update your data"});
		}
	};
	
	return editEmp;
});
