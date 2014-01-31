define(['backbone'],function(Backbone){

	var unauth_search = Backbone.Model.extend({
		initialize : function()
		{
			
			this.on('all',function(e){
				console.log("event: " + e);
			});
		},
		defaults : {
			
			last_name : "undefined",
			dept_name : "undefined",
			title : "undefined",
			limFirst: 0,
			limSecond: 10,
			error:'undefined'
		}
		/*,
		parse : function(response,xhr)
		{	//console.log(response);
			this.initialize();
			this.set({'last_name' : response.last_name,'department' : response.dept_name,'title' : response.title});
		}*/
	});
	return unauth_search;
});