define(['backbone',
'backbone_views/login/login_search_view',
'backbone_views/login/login_login_view',
'backbone_views/login/login_advsearch_view',
'backbone_views/login/login_closeresults_view',
'backbone_collections/unauth_search_coll',
'backbone_models/login_model',
'backbone_views/login/login_submitlogin_view'],function(Backbone, login_search, login_login, adv_search, close_results, search_coll, login_model, submit_login){
	var login_router = Backbone.Router.extend({
		routes: {
			'search' : 'search',
			'login' : 'login',
			'submitlogin': 'submitlogin',
			'advsearch' : 'advsearch',
			'closeresults' : 'closeresults',
			'searchmore' : 'searchmore',
			'searchless' : 'searchless',
			'closeerror' : 'closeerror',
			'closelogin' : 'closelogin'
		},
		
	});

	
	var initialize = function()
	{
		//router initialization
		var login = new login_router();
		
		//view initialization
		var search = new login_search();
		var viewlogin = new login_login();
		var advSearch = new adv_search();
		var close = new close_results();
		var submitLogins = new submit_login();
		
		//model initialization
		var loginModel = new login_model();		
		
		//collection initialization
		var searchResults = new search_coll();
		
		login.on('route:search', function(){
			

			var lastName = search.getLastName();
			var department = search.getDepartment();
			var title = search.getTitle();
			
			searchResults.url ="/unauthsearch/";
			if(lastName=="")
			{
				searchResults.url+="undefined/";
			}
			else
			{
				searchResults.url+=lastName+"/";
			}
			
			if(department=="")
			{
				searchResults.url+="undefined/";
			}
			else
			{
				searchResults.url+=department+"/";
			}
			
			if(title=="")
			{
				searchResults.url+="undefined/";
			}
			else
			{
				searchResults.url+=title+"/";
			}
			searchResults.url +="10/0/";
			//console.log(searchResults.url);
			searchResults.fetch().success(function(res){
				//console.log(searchResults);
				
				$.cookie('offset',0);
				
					
				if(lastName=="")
				{
					$.cookie('queryLastName','undefined');
				}
				else
				{
					$.cookie('queryLastName',lastName);
				}
					
				if(department=="")
				{
					$.cookie('queryDepartment','undefined');
				}
				else
				{
					$.cookie('queryDepartment',department);
				}
					
				if(title=="")
				{
					$.cookie('queryTitle','undefined');
				}
				else
				{
					$.cookie('queryLastName',title);
				}
				
				search.render(searchResults);
				login.navigate('/');
			});
			
		});
		
		login.on('route:searchmore',function(){
			

			var lastName = $.cookie('queryLastName');
			var department = $.cookie('queryDepartment');
			var title = $.cookie('queryTitle');
			
			searchResults.url ="/unauthsearch/";
			if(lastName=="undefined")
			{
				searchResults.url+="undefined/";
			}
			else
			{
				searchResults.url+=lastName+"/";
			}
			
			if(department=="undefined")
			{
				searchResults.url+="undefined/";
			}
			else
			{
				searchResults.url+=department+"/";
			}
			
			if(title=="undefined")
			{
				searchResults.url+="undefined/";
			}
			else
			{
				searchResults.url+=title+"/";
			}
			
			
			
			var offset = parseInt($.cookie('offset'));
			offset+=10;
			var tempt ="10/"+offset+"/";
			
			searchResults.url += tempt;
			
			
			
			//console.log(searchResults.url);
			searchResults.fetch().success(function(res){
				//console.log(searchResults);
				
				var temp = parseInt($.cookie('offset'))
				temp +=10;			
				$.cookie('offset',temp);

				$.each(searchResults.models, function() {
					this.set({error: 'undefined'});
				});
				
				search.render(searchResults);
				login.navigate('/');
			});
			
		});
		
		
		login.on('route:searchless',function(){
			
			if(parseInt($.cookie('offset'))>0)
			{
				var lastName = $.cookie('queryLastName');
				var department = $.cookie('queryDepartment');
				var title = $.cookie('queryTitle');
				
				searchResults.url ="/unauthsearch/";
				if(lastName=="undefined")
				{
					searchResults.url+="undefined/";
				}
				else
				{
					searchResults.url+=lastName+"/";
				}
				
				if(department=="undefined")
				{
					searchResults.url+="undefined/";
				}
				else
				{
					searchResults.url+=department+"/";
				}
				
				if(title=="undefined")
				{
					searchResults.url+="undefined/";
				}
				else
				{
					searchResults.url+=title+"/";
				}
				
				
				
				var offset = parseInt($.cookie('offset'));
				offset -=10;
				var tempt ="10/"+offset+"/";
				
				searchResults.url += tempt;
				//console.log(searchResults.url);
				searchResults.fetch().success(function(res){
					//console.log(searchResults);
					var temp = parseInt($.cookie('offset'));
					temp -=10;
					$.cookie('offset',temp);
					
					$.each(searchResults.models, function() {
					this.set({error: 'undefined'});
				});
					
					search.render(searchResults);
					login.navigate('/');
				});
			}
			else
			{
				$.each(searchResults.models, function() {
					this.set({error: 'Back at the beginning of the query'});
				});
				
				search.render(searchResults);
				login.navigate('/');
			}
		});
		
		login.on('route:login',function(){
			
			viewlogin.render();
			login.navigate('/');
		});
		
		login.on('route:advsearch',function(){
			
			advSearch.render();
			login.navigate('/');
		});
		
		login.on('route:closeresults',function(){
			
			close.render();
			login.navigate('/');
		});
		
		login.on('route:closelogin',function(){
			
			close.renderLogin();
			login.navigate('/');
		});
		
		
		login.on('route:closeerror',function(){
			
			close.render();
			login.navigate('/');
		});
		
		login.on('route:submitlogin',function(){
		//console.log("help");
		
		
			submitLogins.getDataFromView();
			loginModel.set({'username': submitLogins.getUsername(), 'password': submitLogins.getPassword()});
	
			loginModel.fetch().success(function(res){
				
				var js = new Array();
				var count=0;
				if(res.message==undefined)
				{
					res.permission.forEach(function(val){
					//console.log(val);
						var temp = {"PermissionID": val.PermissionID, "PermissionName": val.PermissionName, "MainPermission": val.MainPermission, "extra": val.extra};
						js[count] = temp;
						count++;
					});
					
					//console.log(JSON.stringify(js));
					
					$.cookie('emp_no',res.emp_no);
					$.cookie('permission',JSON.stringify(js));
					$.cookie('navBar',res.navBar);
					
					submitLogins.render(res);
					submitLogins.renderValues(res);
					login.navigate('home');
				}
				else
				{
					submitLogins.renderError(res);
					login.navigate('/');
				}
			});
			
			
		});
		
		//Backbone.history.start();
	}
	
	return initialize;
});