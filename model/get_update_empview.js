define(['model/ORM_objects/global_ORM'],function(globalObj){
	var getView = function(empNo,res)
	{
		globalObj.views.find({where: "id='updateEmp'"}).success(function(result){
		
			globalObj.employees.find({where:"emp_no="+empNo}).success(function(val){
			
				var js = {'employee': val ,'view' : result};
				res.send(js);
			
			});	
			
		});
		
	}
	
	return{
		getUpdateEmpView : getView
	};
});