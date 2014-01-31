define(['backbone'],function(Backbone){

	var index_model = Backbone.Model.extend({
		initialize : function()
		{
			this.on('all',function(e){
				console.log("event: " + e);
			});
		},
		defaults : {
			emp_no : "",
			birth_date : "",
			first_name : "",
			last_name : "",
			gender : "",
			hire_date : ""
		}
		
	});
	return index_model;
});