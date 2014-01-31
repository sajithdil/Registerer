define(['model/ORM_objects/global_ORM'],function (orm){
	var empDet = function(req, res){

		
		var hasPermission=false;
		req.session.permission.forEach(function(val){
			if(val.PermissionID==3)
			{
				hasPermission=true;
			}
		});
		
		if(hasPermission)
		{
			var page = parseInt(req.query["page"]);
			var noOfRows = parseInt(req.query["max"]);
			var field = req.query["searchField"];
			var val = req.query["searchString"];
			var oper = req.query["searchOper"];
			var off = 0;
			if(page != 1)
			{
				off = (page*noOfRows) - noOfRows;
			}
			//console.log(val);
			if(field!=undefined)
			{
				//console.log("fired here");
				orm.employees.count().success(function(c){
					//eq,bw,ew,cn,lt,gt
					var typ ="";
					if(oper=="eq")
					{
						typ=" = " + "'"+val+"'";
					}
					else if(oper=="bw")
					{
						typ = " LIKE "+ "'%"+val+"'";
					}
					else if(oper==" ew")
					{
						typ = " LIKE "+ "'"+val+"%'";
					}
					else if(oper=="cn")
					{
						typ = " LIKE "+ "'%"+val+"%'";
					}
					else if(oper=="lt")
					{
						typ = " > " + "'"+val+"'";
					}
					else if(oper=="gt")
					{
						typ = " < " + "'"+val+"'";
					}
					
						//console.log(field + typ);
					
					orm.employees.find({where: field + typ, limit: noOfRows, offset:off}).success(function(emp){
						var row = new Array();
						var cou=0;
						console.log(emp);
						try{
							emp.forEach(function(val){
						
								var temp = {"emp_no": val.emp_no, "last_name": val.last_name, "first_name": val.first_name,"gender": val.gender, "hire_date": val.hire_date, "birth_date": val.birth_date};
						
								row[cou]=temp;
								cou++;
							});
						}catch(e)
						{
								var temp = {"emp_no": emp.emp_no, "last_name": emp.last_name, "first_name": emp.first_name,"gender": emp.gender, "hire_date": emp.hire_date, "birth_date": emp.birth_date};
						
								row[cou]=temp;
								cou++;
						}
						//console.log(20);
						var js = {'total':c, 'max':noOfRows,'page':page,'rows': row};
					
						//console.log(js);
					
						res.send(js);
					});
				});
			}
			else
			{
				orm.employees.count().success(function(c){
					orm.employees.findAll({limit: noOfRows, offset:off}).success(function(emp){
						var row = new Array();
						var cou=0;
						emp.forEach(function(val){
					
							var temp = {"emp_no": val.emp_no, "last_name": val.last_name, "first_name": val.first_name,"gender": val.gender, "hire_date": val.hire_date, "birth_date": val.birth_date};
					
							row[cou]=temp;
							cou++;
						});
				
						//console.log(20);
						var js = {'total':c, 'max':noOfRows,'page':page,'rows': row};
					
						//console.log(js);
					
						res.send(js);
					});
				});
			}
		}
		else
		{
			res.send({error: "You do not have permission to update your data"});
		}
		
		
		
		
		
		//var js = {total:c, max:10,page:1,rows[[{},{},{}]};
	};
	
	return empDet;
});
