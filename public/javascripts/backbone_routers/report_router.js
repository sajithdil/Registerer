define(['backbone','backbone_models/report_model', 'backbone_views/report/report_view','backbone_views/report/addreport_view','backbone_views/report/removereport_view'],function(Backbone, rep_model, rep_view,add,remove){
	var rep_router = Backbone.Router.extend({
		routes: {
			'report' : 'report',
			'addreport': 'addreport',
			'deletereport': 'deletereport'
		}
	});
	
	var initialize = function()
	{
		//initialize router
		var repRouter = new rep_router();
	
		//initialize model
		var roleModel = new rep_model();
		
		//initialize view
		var repView = new rep_view();
		var addRep = new add();
		var removeRep = new remove();
		
		
		repRouter.on('route:report',function(){

			roleModel.url = "/"+$.cookie('emp_no')+"/report";
			roleModel.fetch().success(function(res){
				repView.render(res);
				repRouter.navigate("/report");
			});
		});
		
		repRouter.on('route:addreport',function(){
				//console.log('add');
				addRep.render();
				repRouter.navigate("/report");
			
		});
		
		repRouter.on('route:deletereport',function(){
				//console.log('remove');
				removeRep.render();
				repRouter.navigate("/report");
			
		});
		
	}
	return initialize;
	
});
	
	
