define(['backbone','backbone_models/role_model', 'backbone_views/role/role_view','backbone_views/role/addpertorole_view','backbone_views/role/removeperfromrole_view'],function(Backbone, role_model, role_view, add, remove){
	var role_router = Backbone.Router.extend({
		routes: {
			'role' : 'role',
			'addpermissiontorole': 'addpermissiontorole',
			'removepermissionfromrole':'removepermissionfromrole'
		}
	});
	
	var initialize = function()
	{
		//initialize router
		var roleRouter = new role_router();
		
		//initialize model
		var roleModel = new role_model();
		
		//initialize view
		var roleView = new role_view();
		var addPer = new add();
		var removePer = new remove();
		
		roleRouter.on('route:role',function(){
		
			roleModel.url = "/"+$.cookie('role_no')+"/role/view";
			roleModel.fetch().success(function(res){
				roleView.render(res);
				roleRouter.navigate("/role");
			});
		});
		
		roleRouter.on('route:addpermissiontorole',function(){

			addPer.render(roleRouter);
			//roleRouter.navigate("/role");
		});
		
		roleRouter.on('route:removepermissionfromrole',function(){
		
			removePer.render(roleRouter);
			//roleRouter.navigate("/role");
		});
	}
	return initialize;
	
});
	
	
