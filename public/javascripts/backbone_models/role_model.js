define(['backbone'],function(Backbone){

	var role_model = Backbone.Model.extend({
		initialize : function()
		{
			this.on('all',function(e){
				console.log("event: " + e);
			});
		}
	});
	return role_model;
});