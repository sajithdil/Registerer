define(['backbone','backbone_models/employee_model', 'backbone_views/employee/employee_view','backbone_views/employee/addpertoemp_view','backbone_views/employee/removeperfromemp_view'],function(Backbone, employee_model, employee_view,add,remove){
	var emp_router = Backbone.Router.extend({
		routes: {
			'employee' : 'employee',
			'addpermissiontoemployee': 'addpermissiontoemployee',
			'removepermissionfromemployee': 'removepermissionfromemployee'
		}
	});
	
	var initialize = function()
	{
		//initialize router
		var empRouter = new emp_router();
		
		//initialize model
		var empModel = new employee_model();
		
		//initialize view
		var empView = new employee_view();
		var addPer = new add();
		var removePer = new remove();
		
		empRouter.on('route:employee',function(){

			empModel.url = "/"+$.cookie('emp_no')+"/employee/view";
			empModel.fetch().success(function(res){
				empView.render(res);
				empRouter.navigate("/employee");
			});
		});
		
		empRouter.on('route:addpermissiontoemployee',function(){
				//console.log('add');
				addPer.render(empRouter);
				//empRouter.navigate("/employee");
			
		});
		
		empRouter.on('route:removepermissionfromemployee',function(){
				//console.log('remove');
				removePer.render(empRouter);
				//empRouter.navigate("/employee");
			
		});
		
	}
	return initialize;
	
});
	
	
