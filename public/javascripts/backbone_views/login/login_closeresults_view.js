define(['backbone'],function(Backbone){
	var closeres = Backbone.View.extend({
		initialize: function()
		{
		},
		render: function()
		{
			$("#divSearchResults").slideUp("slow");
		},
		renderLogin: function()
		{
			$("#logMessage").stop(true,true).effect('slide',1000).css('display','none');
			$("#logMessage").remove(0);
		}
	});
	
	return closeres;
});