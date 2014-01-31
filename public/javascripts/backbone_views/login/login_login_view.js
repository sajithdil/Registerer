define(['backbone'],function(Backbone){

	var home = Backbone.View.extend({
		login : false,
		initialize: function()
		{
			
		},
		render: function()
		{
		
			if(this.login == false)
			{
				$("#divLogin").slideDown("slow");
				this.login = true;
			}
			else
			{
				$("#divLogin").slideUp("slow");
				this.login = false;
			}
		}
	});
	
	return home;
});