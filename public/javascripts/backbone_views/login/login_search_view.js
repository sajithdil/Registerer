define(['backbone'],function(Backbone){
	var home = Backbone.View.extend({
		initialize: function()
		{
		},
		render: function(res_coll)
		{
			if(res_coll.models[0]==undefined)
			{
				var error = "<div class='span4'><div class='alert alert-block'>\n<a class='close' href='#closeerror'>x</a>\n<strong>Message: </strong>No Results\n</div></div>";
				
				$("#divSearchResults").stop(true,true).effect('slide',250).css('display','none');
				$("#divSearchResults").empty();
				$("#divSearchResults").append(error);
				$("#divSearchResults").stop(true,true).effect('slide',250).css('display','block');
			}
			else if(res_coll.models[0].get('error')=='undefined'){
			$("#divSearchResults").stop(true,true).effect('slide',250).css('display','none');
				var table = '<a class=\'btn btn-info pull-right\' id=\'btnClose\' href=\'#closeresults\'><i class=\'icon-remove\'></i></a>\n<table class=\'table table-bordered table-striped table-hover\'>\n'+
				'<tr>\n<thead>\n<tr>\n<th>First Name</th>\n<th>Last Name</th>\n<th>Gender</th></tr></thead><tbody>';
				
				
				$.each(res_coll.models, function() {
					var temp = "<tr><td>"+this.get('first_name')+"</td><td>"+this.get('last_name')+"</td><td>"+this.get('gender')+"</td></tr>";
					table += temp;
				});
					
				
				table += '</tbody>\n</table>\n';
				table+="<div class='pager'><ul><li><a href='#searchless'>Previous</a></li><li><a href='#searchmore'>Next</a></li></ul></div>"
				$("#divSearchResults").empty();
				$("#divSearchResults").append(table);
				$("#divSearchResults").stop(true,true).effect('slide',250).css('display','block');
			}
			
			else
			{
				var error = "<div id='logMessage' class='span4'><div class='alert alert-error'>\n<a class='close' href='#closeerror'>x</a>\n<strong>Error: </strong>"+res_coll.models[0].get('error')+"\n</div></div>";
				
				$("#divSearchResults").stop(true,true).effect('slide',250).css('display','none');
				$("#divSearchResults").empty();
				$("#divSearchResults").append(error);
				$("#divSearchResults").stop(true,true).effect('slide',250).css('display','block');
			}
		},
		getLastName: function()
		{
			return $('#lastname').val();
		},
		getDepartment: function()
		{
			return $('#department').val();
		},
		getTitle: function()
		{
			return $('#title').val();
		}
	});
	
	return home;
});