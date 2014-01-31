define(['backbone'],function(Backbone){

	var dept_model = Backbone.Model.extend({
		initialize : function()
		{
			this.on('all',function(e){
				console.log("event: " + e);
			});
		}
	});
	return dept_model;
});