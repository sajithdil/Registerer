/*
	defining REST services and 
	setting the business logic functions to them
*/

//loading the routes/index.js file to be used
define(['routes/index',
'routes/login',
'routes/unauth_search',
'routes/edit_emp',
'routes/update_empview',
'routes/salary_history',
'routes/employee_view',
'routes/employee_det',
'routes/my_info',
'routes/add_emp',
'routes/del_emp',
'routes/department_view',
'routes/role_view',
'routes/add_role',
'routes/edit_role',
'routes/delete_role',
'routes/add_department',
'routes/edit_department',
'routes/delete_dept',
'routes/dept_det',
'routes/role_det',
'routes/logout',
'routes/report_view',
'routes/permission_det',
'routes/add_per_emp',
'routes/get_per_emp',
'routes/remove_per_emp',
'routes/add_per_role',
'routes/get_per_role',
'routes/remove_per_role',
'routes/get_emp_dep',
'routes/add_emp_dept',
'routes/remove_emp_dep',
'routes/add_man_dep',
'routes/remove_man_dep',
'routes/get_man_dep'],
function (routes, login, unauth_search, edit_emp, update_empview, 
salary_history, employee_view, employee_det, my_info, add_emp, del_emp,
dept_view, role_view, add_role, edit_role, del_role, add_dept, edit_dept,
del_dept, dept_det, role_det, logout, report_view, per_det, add_per_emp, 
get_per_emp, remove_per_emp, add_per_role,get_per_role,remove_per_role,
get_emp_dep, add_emp_dep, remove_emp_dep, add_man_dep, rem_man_dep, 
get_man_dep)
{
		var initialize = function(app)
		{
			//defining the localhost:3000, localhost:3000/index REST service
			app.get('/', routes);
			app.get('/submitlogin/:username/:password', login);
			app.get('/unauthsearch/:lastname/:department/:title/:limFirst/:limSecond',unauth_search);
			app.get('/:id/edit/:lastname/:firstname/:gender/:hiredate/:birthdate',edit_emp);
			app.get('/updateempview',update_empview);
			//start employee
			app.post('/:id/employee/edit/:empno/:lastname/:firstname/:gender/:hiredate/:birthdate',edit_emp);
			app.put('/:id/employee/:empno/:lastname/:firstname/:gender/:hiredate/:birthdate',add_emp);
			app.delete('/:id/employee/:empno',del_emp);
			app.get('/:id/employee/view',employee_view);
			app.get('/:id/employee',employee_det);
			//end employee
			//start department
			app.get('/:id/department/view',dept_view);
			app.put('/:id/department/:deptid/:deptname',add_dept);
			app.post('/:id/department/edit/:deptid/:deptname',edit_dept);
			app.delete('/:id/department/:deptid',del_dept);
			app.get('/:id/department',dept_det);
			//end department
			//start role
			app.get('/:id/role/view',role_view);
			app.put('/:id/role/:roleid/:rolename',add_role);
			app.post('/:id/role/edit/:roleid/:rolename',edit_role);
			app.delete('/:id/role/:roleid',del_role);
			app.get('/:id/role',role_det);
			//end role
			app.get('/salaryhistory/:offset',salary_history);
			app.get('/:id/myinfo',my_info);
			app.get('/logout', logout);
			//start report
			app.get('/:id/report',report_view)
			//end report
			//start permission
			app.get('/:id/permission',per_det);
			app.post('/:id/employee/addpermission/:perid/:empno',add_per_emp);
			app.get('/:id/permission/employees/:perid', get_per_emp);
			app.post('/:id/permission/employees/:perid/remove/:empno', remove_per_emp);
			app.post('/:id/role/addpermission/:perid/:roleid',add_per_role);
			app.get('/:id/permission/role/:perid',get_per_role);
			app.post('/:id/permission/role/:perid/remove/:roleid',remove_per_role);
			//end permission
			//start employee - department
			app.get('/:id/employee/department/:deptid',get_emp_dep);
			app.get('/:id/employee/department/manager/:deptid',get_man_dep);
			//app.post('/:id/employee/department/:deptid/:empno/:start/:end', add_emp_dep);
			app.post('/:id/employee/department/:deptid/:empno', add_emp_dep);
			app.post('/:id/employee/department/manager/:deptid/:empno', add_man_dep);
			app.post('/:id/employee/department/:deptid/removeemployee/:empid',remove_emp_dep);
			app.post('/:id/employee/department/manager/:deptid/removemanager/:empid',rem_man_dep);
			//end employee - department
		}

		return initialize;

});
