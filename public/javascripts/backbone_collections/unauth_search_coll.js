define(['backbone_models/unauth_search_model'],function(search_model){
	var search_coll = Backbone.Collection.extend({
		initialize: function()
		{
		},
		model: search_model,
		url: '/unauthsearch'
	});
	
	return search_coll;
});