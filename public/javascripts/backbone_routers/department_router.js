define([
'backbone',
'backbone_models/department_model',
'backbone_views/department/dept_view',
'backbone_views/department/addemptodept_view',
'backbone_views/department/removeempfromdept_view',
'backbone_views/department/addManagerToDept_view',
'backbone_views/department/removeManagerFromDept_view'],
function(Backbone, dept_model, dept_view,add,remove, addManager, removeManager){
	var dept_router = Backbone.Router.extend({
		routes: {
			'department' : 'department',
			'addemployeetodepartment': 'addemployeetodepartment',
			'removeemployeefromdepartment': 'removeemployeefromdepartment',
			'closedeptaddmess':'closedeptaddmess',
			'addmanagertodepartment':'addmanagertodepartment',
			'removemanagerfromdepartment':'removemanagerfromdepartment'
		}
	});
	
	var initialize = function()
	{
		//initialize router
		var deptRouter = new dept_router();
		
		//initialize model
		var deptModel = new dept_model();
		
		//initialize view
		var deptView = new dept_view();
		var addEmp = new add();
		var removeEmp = new remove();
		var addMan = new addManager();
		var remMan = new removeManager();
		
		deptRouter.on('route:department',function(){
		
			deptModel.url = "/"+$.cookie('emp_no')+"/department/view";
			deptModel.fetch().success(function(res){
				deptView.render(res);
				deptRouter.navigate("/department");
			});
		});
		
		deptRouter.on('route:addemployeetodepartment',function(){
		
			addEmp.render();
			//deptRouter.navigate("/department");
		});
		deptRouter.on('route:removeemployeefromdepartment',function(){
		
			removeEmp.render();
			//deptRouter.navigate("/department");
		});
		deptRouter.on('route:closedeptaddmess',function(){
		
			addEmp.closeAddMessage();
			deptRouter.navigate("/department");
		});
		deptRouter.on('route:addmanagertodepartment',function(){
		
			addMan.render();
			//deptRouter.navigate("/department");
		});
		deptRouter.on('route:removemanagerfromdepartment',function(){
		
			remMan.render();
			//deptRouter.navigate("/department");
		});
	}
	return initialize;
	
});
	
	
