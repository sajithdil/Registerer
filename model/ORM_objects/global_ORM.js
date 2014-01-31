/*
	global object that returns all other ORM objects
	associations are defined here
	
	this has been defined this way to aviod circular dependencies that occur
	when creating the object
*/

define(['model/ORM_objects/departments','model/ORM_objects/dept_emp','model/ORM_objects/dept_manager',
'model/ORM_objects/employees','model/ORM_objects/salaries','model/ORM_objects/titles','model/ORM_objects/login_details','model/ORM_objects/views',
'model/ORM_objects/Role','model/ORM_objects/Permissions','model/ORM_objects/role_permissions','model/ORM_objects/login_permissions'],
function(departments, dept_emp, dept_manager, 
employees, salaries, titles, login_details,views,role,permission,role_permission,login_permission){
	
	
	/* intresting piece of code to look at
	Notify.findAll({
    include: ['User', 'Notification']
		}).success(function (notify) {
			console.log(notify.user);
			console.log(notify.notification);
		});
	*/
	
	//1..* relationship between departments <--> dept_emp 
	departments.hasMany(dept_emp,{as: 'Employee', foreignKey:'dept_no'});
	//1..* relationship between departments <--> dept_manager 
	departments.hasMany(dept_manager,{as: 'Manager', foreignKey:'dept_no'});
	
	//1..* relationship between Employees <--> dept_emp
	employees.hasMany(dept_emp,{as: 'DepartmentEmployee', foreignKey:'emp_no'});
	
	//1..* relationship between Employees <--> dept_managers
	employees.hasMany(dept_manager,{as: 'DepartmentManager', foreignKey:'emp_no'});
	
	//1..* relationship between Employees <--> salaries
	employees.hasMany(salaries,{as: 'Salary', foreignKey:'emp_no'});
	
	//1..* relationship between Employees <--> titles
	employees.hasMany(salaries,{as: 'Salary', foreignKey:'emp_no'});
	
	//1..1 relationship between Employees <--> login_details
	employees.hasMany(login_details,{as: 'LoginDet', foreignKey:'emp_no'});
	
	//1..* relationship between login_permission <--> login_details
	login_details.hasMany(login_permission,{foreginKey: 'emp_no', as: 'LoginPermission'});
	
	//1..* relationship between permission <--> login_details
	permission.hasMany(login_permission,{foreignKey: 'PermissionID', as: 'LoginPermission'});
	
	//1..1 relationship between view <--> permission
	views.hasOne(permission,{foreignKey:'PermissionID', as: 'Permission'});
	
	//1..* relationship between permission <--> role_permission
	permission.hasMany(role_permission,{foreignKey: 'PermissionID', as: 'RolePermission'});
	
	//1..* relationship between role <--> role_permission
	role.hasMany(role_permission,{foreignKey: 'RoleID', as: 'RolePermission'});
	
	// the 1..1 backward association between dept_emp <--> departments
	dept_emp.belongsTo(departments);
	// the 1..1 backward association between dept_emp <--> employees
	dept_emp.belongsTo(employees);
	
	// the 1..1 backward association between dept_manager <--> dept_manager
	dept_manager.belongsTo(departments);
	// the 1..1 backward association between dept_manager <--> employees
	dept_manager.belongsTo(employees);
	
	// the 1..1 backward association between salaries <--> employees
	salaries.belongsTo(employees);
	
	// the 1..1 backward association between titles <--> employees
	titles.belongsTo(employees);
	// the 1..1 backward association between employees <--> login_details
	login_details.belongsTo(employees);
	// the 1..1 backward association between login <--> login_details
	login_permission.belongsTo(login_details);
	// the 1..1 backward association between login <--> permission
	login_permission.belongsTo(permission);
	// the 1..1 backward association between permission <--> views
	permission.belongsTo(views);
	// the 1..1 backward association between role_permission <--> role
	role_permission.belongsTo(role);
	// the 1..1 backward association between role_permission <--> permission
	role_permission.belongsTo(permission);
	return{
		employees: employees,
		departments: departments,
		dept_emp: dept_emp,
		dept_manager: dept_manager,
		salaries: salaries,
		titles: titles,
		login_details: login_details,
		views: views,
		role: role,
		permission: permission,
		role_permission: role_permission,
		login_permission: login_permission
	}
});