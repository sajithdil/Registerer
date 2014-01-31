define(['backbone',
'backbone_models/edit_employee_model',
'backbone_views/home/home_editemp_view',
'backbone_views/home/home_salary_view',
'backbone_models/salary_model',
'backbone_models/myinfo_model',
'backbone_views/home/home_myinfo_view',
'backbone_models/logout_model'],function(Backbone,edit_emp_model,edit_emp_view,salary_view,salary_model,myinfo_model, myinfo_view, logout){
	var home_router = Backbone.Router.extend({
		routes: {
			'editinfo' : 'editinfo',
			'editinfosubmit': 'editinfosubmit',
			'editinfoclose':'editinfoclose',
			'closesuccess':'closesuccess',
			'salaryhistory':'salaryhistory',
			'salaryhistorysearchmore':'salaryhistorysearchmore',
			'salaryhistorysearchless':'salaryhistorysearchless',
			'myinfo': 'myinfo',
			'logout': 'logout'
		},
		
	});

	
	var initialize = function()
	{
		//router initialization
		var home = new home_router();
		
		//model initialization
		var editEmpModel = new edit_emp_model();
		var salaryModel = new salary_model();
		var myinfoModel = new myinfo_model();
		var logoutModel = new logout();
		
		//view initialization
		var editEmpView = new edit_emp_view();
		var salaryView = new salary_view();
		var myinfoView = new myinfo_view();
		
		home.on('route:logout', function(){
			logoutModel.url = "/";
			logoutModel.fetch().success(function(){
				console.log("success");
				home.navigate('/');
			});
		});
		home.on('route:editinfo', function(){
			editEmpModel.url = "/updateempview";
			editEmpModel.fetch().success(function(res){
				editEmpView.render(res);
				home.navigate('/home');
			});
		});
		
		home.on('route:editinfosubmit', function(){
			editEmpModel.url = "/"+$.cookie('emp_no')+"/edit/"+editEmpView.getLastName()+
			"/"+editEmpView.getFirstName()+"/"+editEmpView.getGender()+"/"+editEmpView.getHireDate()+
			"/"+editEmpView.getBirthDate();
			console.log(editEmpModel.url);
			editEmpModel.fetch().success(function(res){
			
				console.log(res);
				editEmpView.closeDialog();
				editEmpView.renderMessage(res);
				home.navigate('/home');
			});
		});
		
		home.on('route:editinfoclose', function(){

			editEmpView.closeDialog();	
			home.navigate('/home');
			
		});
		
		home.on('route:closesuccess', function(){

			editEmpView.closeSuccess();	
			home.navigate('/home');
			
		});
		
		home.on('route:salaryhistory', function(){
			
			salaryModel.url='/salaryhistory/0';
			salaryModel.fetch().success(function(res){
				$.cookie('salaryoffset',0);
				salaryView.render(res);
				home.navigate('/home');
			});
			
		});
		
		home.on('route:salaryhistorysearchmore', function(){
			
			var offset = parseInt($.cookie('salaryoffset'));
			offset+=10;
			salaryModel.url='/salaryhistory/'+offset;
			
			salaryModel.fetch().success(function(res){
				$.cookie('salaryoffset',offset);
				salaryView.render(res);
				home.navigate('/home');
			});
		});
		
		home.on('route:salaryhistorysearchless', function(){
			
			if(parseInt($.cookie('salaryoffset'))>0)
			{
				var offset = parseInt($.cookie('salaryoffset'));
				offset-=10;
				salaryModel.url='/salaryhistory/'+offset;
				salaryModel.fetch().success(function(res){
					$.cookie('salaryoffset',offset);
					salaryView.render(res);
					home.navigate('/home');
				});
			}
			else
			{
				salaryModel.set('error','Reached the beginning of the results');
				salaryView.render(salaryModel);
				home.navigate('/home');
			}
			//editEmpView.closeSuccess();	
			
			
		});
		
		home.on('route:myinfo', function(){
			
			myinfoModel.url = "/"+$.cookie('emp_no')+"/myinfo";
			//editEmpView.closeSuccess();	
			myinfoModel.fetch().success(function(res){
				myinfoView.render(res);
				home.navigate('/home');
			});
			
		});
		//Backbone.history.start();
	}
	
	return initialize;
});