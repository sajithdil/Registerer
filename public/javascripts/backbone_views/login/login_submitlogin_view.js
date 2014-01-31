define(['backbone'],function(Backbone){
	var submitLogin = Backbone.View.extend({
		getDataFromView: function(){
			this.username = $('#txtUsername').val();
			this.password = $('#txtPassword').val();
		},
		getUsername: function()
		{
			return this.username;
		},
		getPassword: function()
		{
			return this.password;
		},
		render: function(template)
		{
			
				//$('#divBody').empty().append(template);
				$("#divBody").stop(true,true).effect('slide',1000).css('display','none');
				$("#divBody").empty();
				$("#divBody").append(template.view.views);
				$("#Links").append(template.navBar);
				//$("#divBody").stop(true,true).effect('slide',1000).css('display','block');
			
			
			
		},
		renderError:function(template)
		{
			console.log(template);
			var error = "<div id='logMessage' class='span4'><div class='alert alert-error'>\n<a class='close' href='#closelogin'>x</a>\n<strong>Error: </strong>"+template.message+"\n</div></div>";
			$('#divLogin').append(error);
		},
		renderValues: function(template)
		{
			$("#lblLastName").text(template.employee.last_name);
			$("#lblFirstName").text(template.employee.first_name);
			$("#lblGender").text(template.employee.gender);
			$("#lblHireDate").text(template.employee.hire_date);
			$("#lblBirthDate").text(template.employee.birth_date);
			$("#empNo").text("Welcome "+template.employee.last_name+" ("+template.employee.emp_no+")");
			$("#divBody").stop(true,true).effect('slide',1000).css('display','block');
		}
	});
	
	return submitLogin;
});