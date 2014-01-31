define(['backbone'],function(Backbone){

	var login_model = Backbone.Model.extend({
		initialize : function()
		{
			
		},
		defaults : {
			username:'undefined',
			password:'undefined',
			role:'undefined',
			emp_no:'undefined',
			viewTemplate:'undefined'
		},
		urlRoot:"/submitlogin/",
		url: function()
		{
			var temp = this.urlRoot + this.get('username')+ "/" + this.get('password');
			return temp;
		},
		parse : function(response,xhr)
		{
			this.set({
				'role' : response.role,
				'viewTemplate': response.template,
				'emp_no': response.emp_no
			});
		}
		
	});
	return login_model;
});