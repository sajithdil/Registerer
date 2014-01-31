define(['backbone'],function(Backbone){

	var edit_emp = Backbone.Model.extend({
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
	return edit_emp;
});