define(['backbone'],function(Backbone){

	var unauth_search = Backbone.Model.extend({
		initialize : function()
		{
			
			this.on('all',function(e){
				console.log("event: " + e);
			});
		}
		
	});
	return unauth_search;
});