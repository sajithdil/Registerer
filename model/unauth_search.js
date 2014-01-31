define(['model/ORM_objects/unauth_search_results'],function(search){
	var getSearchResults = function(lastName, department, title, limFirst, limSecond, cb, res)
	{
		if(lastName=="undefined" && department=="undefined" && title=="undefined")
		{
			console.log('empty query');
			res.send({error:'empty query'});
		}
		else{
			search.doSearch(lastName,department,title,limFirst, limSecond,cb);
			
		}
		
	}
	
	return{
		getSearchResults : getSearchResults
	};
});