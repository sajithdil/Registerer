define(['backbone'],function(Backbone){
	

	var editEmp = Backbone.View.extend({
		initialize: function()
		{
			
		},
		render: function(res)
		{
			$("#mainBody").empty().stop(true,true).effect('slide',1000).css('display','none');;
			$("#mainBody").append(res.view.views);
			$("#Links").append($.cookie('navBar'));
			
			$("#lblLastName").text(res.employee.last_name);
			$("#lblFirstName").text(res.employee.first_name);
			$("#lblGender").text(res.employee.gender);
			$("#lblHireDate").text(res.employee.hire_date);
			$("#lblBirthDate").text(res.employee.birth_date);
			$("#empNo").text("Welcome "+res.employee.last_name+" ("+res.employee.emp_no+")");
			$("#mainBody").stop(true,true).effect('slide',1000).css('display','block');
		}
		
		
	});
	
	return editEmp;
});