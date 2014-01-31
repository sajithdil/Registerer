/*
 BL to do PUT for add employees info
 */

define(['model/ORM_objects/global_ORM'],function (globobj){
//define([],function (){
	var addEmp = function(req, res){
	
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==4)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var lastName = req.params.lastname;
			var firstName = req.params.firstname;
			var gender = req.params.gender;
			var hireDate = req.params.hiredate;
			var birthDate = req.params.birthdate;
			
			
			globobj.employees.max('emp_no').success(function(c){
			
				var empNo = parseInt(c)+1;
				globobj.employees.create({emp_no: empNo, last_name:lastName, first_name: firstName, gender: gender, hire_date: hireDate, birth_date: birthDate }).success(function(resu){
				res.send({message: "Insert Successful"});
			});
			})
			
			
		}
		else
		{
			res.send({error: "You do not have permission to add employees"});
		}
	};
	
	return addEmp;
});
