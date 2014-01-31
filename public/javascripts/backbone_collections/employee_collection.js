define(['backbone_models/employee_model'],function(emp_model){
	var emp_coll = Backbone.Collection.extend({
		initialize: function()
		{
		},
		model: emp_model,
		url: '/unauthsearch'
	});
	
	return emp_coll;
});