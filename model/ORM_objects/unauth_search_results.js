define(['sequelize_util/sequelize'],function(seq){
	var departments = seq.define('',{
		emp_no: {type: seq.INTEGER},
		dept_name: {type: seq.DATE},
		ttle:{type: seq.STRING}
	},{
		timestamps :false,
		freezeTableName:true,
		classMethods:{
			doSearch: function(lastName,department,title,limFirst,limSec,cb){
				seq.query("call unauth_emp_search('"+lastName+"','"+department+"','"+title+"','"+limFirst+"','"+limSec+"')",this).on('success',cb);
			}
		}
	});
	
	return departments;
});