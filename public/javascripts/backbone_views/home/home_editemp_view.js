define(['backbone'],function(Backbone){
	

	var editEmp = Backbone.View.extend({
		initialize: function()
		{
			
		},
		render: function(view)
		{
			$("#mainBody").append(view.view.views);
			
			$( "#editEmpDialog" ).dialog({
				autoOpen: false,
				show: "blind",
				hide: "explode",
				width: 500
			});
			
			$("#txtLastName").val(view.employee.last_name);
			$("#txtFirstName").val(view.employee.first_name);
			$('#txtGender').val(view.employee.gender);
			$("#txtBirthDate").val(view.employee.birth_date);
			$("#txtHireDate").val(view.employee.hire_date);
			
			$( "#txtHireDate" ).datepicker();
			$( "#txtBirthDate" ).datepicker();
			
			$( "#editEmpDialog" ).dialog( "open" );
		},
		closeDialog : function()
		{
			$( "#editEmpDialog" ).dialog( "close" );
			$("#editEmpDialog").remove();
		},
		closeSuccess : function()
		{
			
			$("#divAlert").remove();
		},
		renderMessage:function(emp){
		
			var mess = "<div id='divAlert' class='alert alert-success' style='position:absolute; left:650px; top:180px;'><a class='close' href='#closesuccess'>x</a><strong>Success: </strong>Employee data updated successfully</div>"
			$("#divBody").append(mess);
			
			$("#lblLastName").val(emp.last_name);
			$("#lblFirstName").val(emp.first_name);
			$('#lblGender').val(emp.gender);
			$("#lblBirthDate").val(emp.birth_date);
			$("#lblHireDate").val(emp.hire_date);
		},
		getLastName:function(){
			return $("#txtLastName").val();
		},
		getFirstName:function(){
			return $("#txtFirstName").val();
		},
		getGender:function(){
			return $('#txtGender :selected').val();
		},
		getBirthDate:function(){
			return $("#txtBirthDate").val();
		},
		getHireDate:function(){
			return $("#txtHireDate").val();
		}
		
	});
	
	return editEmp;
});