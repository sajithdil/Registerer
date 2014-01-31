 require.config({
	baseUrl: "../../javascripts",
    paths:{
		jquery: 'lib/jquery/jquery',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		jqueryui:'lib/jquery/jquery-ui',
		jquerycookie: 'lib/jquery/jquery.cookie',
		jqueryjade:'lib/jquery/jquery.jadedom',
		jade:'lib/jquery/jade',
		jqgrid:'lib/jqgrid/jquery.jqGrid.src',
		jqgriddep:'lib/jqgrid/grid.locale-en',
		jqgridtime:'lib/jquery/jquery-ui-timepicker-addon',
		jqmessage:'lib/jquery/jquery.msgBox'
	},
	shim: {
		'jquery':{
			exports :'$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [
				'underscore',
				'jquery',
				'jqueryui',
				'jquerycookie',
				'jqueryjade',
				//'jade',
				'jqgrid',
				'jqgriddep',
				'jqgridtime',
				'jqmessage'
			],
			exports: 'Backbone'
		}
	},
});
require(['backbone',
'backbone_routers/login_router',
'backbone_routers/home_router',
'backbone_routers/employee_router',
'backbone_routers/role_router',
'backbone_routers/department_router',
'backbone_routers/report_router'],function(Backbone,login_route,home_route,employee_route, role_route, dept_route, rep_route){
	
	// initlialize routes
	login_route();
	home_route();
	employee_route();
	role_route();
	dept_route();
	rep_route();
	Backbone.history.start();
});