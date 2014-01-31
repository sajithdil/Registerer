define(['backbone'],function(Backbone){
	

	var advSearch = Backbone.View.extend({
		open : false,
		initialize: function()
		{
			
		},
		render: function()
		{
			console.log(this.open);
			if(this.open == false)
			{
				$("#divAdSearch").slideDown("slow");
				this.open = true;
			}
			else
			{
				$("#divAdSearch").slideUp("slow");
				this.open = false;
			}
		}
	});
	
	return advSearch;
});