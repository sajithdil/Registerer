
/*
 BL to GET unauthenticated search results
 */

define(['model/unauth_search'],function (search){
//define([],function (){
	var searchRes = function(req, res){
		//console.log(req.param);
		var lastName = req.params.lastname;
		var department = req.params.department;
		var title = req.params.title;
		var limFirst = req.params.limFirst;
		var limSecond = req.params.limSecond;
		/*console.log(lastName);
		console.log(department);
		console.log(title);*/
		
		search.getSearchResults(lastName, department, title,limFirst, limSecond,function(results){
			res.send(results);
		},res);
		
		/*var temp ={
			"employees": [
			{ "firstName":"John" , "lastName":"Doe" }, 
			{ "firstName":"Anna" , "lastName":"Smith" }, 
			{ "firstName":"Peter" , "lastName":"Jones" }
			]};*/
		
		
		//res.json(temp);
	};
	
	return searchRes;
});



