
/*
 BL to GET login page.
 */

define(['model/ORM_objects/global_ORM'],function (orm_obj){
	var login = function(req, res){
		//console.log(req.params.password);
		var us = req.params.username;
		var pa = req.params.password;
		
		//console.log(us);
		
		
		// remember to work on the query to turn into a temporary table as if login_permission is empty no results are returned
		orm_obj.login_details.find({where:"username = '"+us+"' AND password='"+pa+"'"}).success(function(results){
			//console.log(results);
			if(results==null)
			{
				res.send({message:"Login Error: Please check login details"});
			}
			else
			{
				orm_obj.permission.getPermissions(results.emp_no,results.RoleID,function(val){
			
				//this will hold all the main permission's names
				var perName = {};
					
				// this will hold all the sub permissions
				var perm={};
				// check if this works whena an array actually comes in	
				
				val.forEach(function(temp){
					if(temp.MainPermission==0)
						{
							perm[temp.PermissionID]={};
							perName[temp.PermissionID] = temp.PermissionName;
						}
				
				});
				
				val.forEach(function(temp){
					if(temp.MainPermission!=0 && temp.extra==""&& temp.extra==""&& temp.extra==""&& temp.extra=="")
						{
							//console.log("here");
							var ex = perm[temp.MainPermission];
							ex[temp.PermissionID] = temp.PermissionName;
							
							perm[temp.MainPermission] = ex;
						}
				});
				
				
				//build the nav bar
				
				var navBar="<ul class='nav'>\n";

				for(var key in perName)
				{
					
					navBar+="<li id='"+perName[key].replace(/ /g,'')+"' class='dropdown'>\n";
					navBar+="<a class='dropdown-toggle' data-toggle='dropdown' href='#"+perName[key].replace(/ /g,'').toLowerCase()+"'>"+perName[key]+"<b class='caret'></b></a>\n";
							
					//foreach loop of the sub permissions
					
					var temp = perm[key];
					navBar+="<ul class='dropdown-menu'>\n";
					for(var tempKey in temp)
					{
						//console.log("here");
						navBar+="<li id='"+temp[tempKey].replace(/ /g,'').toLowerCase()+"'><a href='#"+temp[tempKey].replace(/ /g,'').toLowerCase()+"'>"+temp[tempKey]+"</a></li>\n";
					}
					navBar+='</ul>\n';
					navBar+="</li>"
				}
				
				navBar+= "</ul>"
				//console.log(navBar);
				
				orm_obj.views.find({where: "id='home'"}).success(function(view){
				
				    //console.log(view);
					
				
				orm_obj.employees.find({where: 'emp_no='+results.emp_no}).success(function(empl){
					var js = {'emp_no': results.emp_no, 'permission': val, 'navBar': navBar, 'view': view, 'employee': empl};
					//console.log(js.emp_no);
					req.session.emp_no = results.emp_no;
					req.session.permission = val;
					res.send(js);
				});
	
				});
				//res.render('employee');
			});
			}
			
		});
		
		
		
	};
	
	return login;
});
