define(['backbone'],function(Backbone){
	

	var salary = Backbone.View.extend({
		initialize: function()
		{
			var table ="<div id='divSalaryView'>";
			table+="</div>";
			$("#mainBody").append(table);
		},
		render: function(res)
		{
			try{
				if(res.get('error')!='undefined'){
				
				$("#divSalaryView").stop(true,true).effect('slide',250).css('display','none');
				
					
				var table = "<div class='span4'><div class='alert alert-error'>\n<strong>Error: </strong>"+res.get('error')+"\n</div></div><div class='pager'><ul><li><a href='#salaryhistorysearchmore'>Next</a></li></ul></div>";
				
				$("#divSalaryView").empty();
				$("#divSalaryView").append(table);
				
				
				$("#divSalaryView").stop(true,true).effect('slide',250).css('display','block');
				}
				
			}
			catch(e)
			{

				$("#divSalaryView").stop(true,true).effect('slide',250).css('display','none');
				
				$("#divSalaryView").empty();
				
					var table = "<table class=\'table table-bordered table-striped table-hover\'>\n";
					
					table += "<tr>\n<thead>\n<tr>\n<th>From Date</th>\n<th>To Date</th>\n<th>Salary</th>\n</tr></thead><tbody>";
				
					res.forEach(function(val){
						table+="<tr><td>"+val.from_date+"</td><td>"+val.to_date+"</td><td>"+val.salary+"</td></tr>";
					});
				
					table+="</tbody>\n</table>\n";
					table+="<div class='pager'><ul><li><a href='#salaryhistorysearchless'>Previous</a></li><li><a href='#salaryhistorysearchmore'>Next</a></li></ul></div>\n"

					
					$("#divSalaryView").append(table);
					
					$( "#divSalaryView" ).dialog({
						show: "blind",
						hide: "explode",
						width: 500,
						top:50,
						title: "Salary History"
					});
					$("#divSalaryView").stop(true,true).effect('slide',250).css('display','block');
			}
		}
	});
	
	return salary;
});