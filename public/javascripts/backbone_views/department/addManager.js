define([],function(){
	var add = function(rowId)
	{
			//var dataFromCellByColumnIndex = jQuery('#list').jqGrid ('getCell', rowId, 7);
			//var dataFromCellByColumnName = jQuery('#list').jqGrid ('getCell', rowId, 'Tax');
			//console.log("fire here");
			var per = "<div id='perDiv'>";
			per+="<table id='perGrid'></table>";
			per+="<div id='perPager'></div>";
			per+="</div>";
			$("#bodyWork").append(per);
			$("#perDiv").css('position','absolute').css('left',450).css('top',120);
			
			var URL = "/"+$.cookie('emp_no')+"/employee";
			var options = {
			  url: URL,
				colModel:[
				{name:'emp_no', label: 'Employee No', width: 100,editable:true,
				editoptions:{ 
                            dataInit: function(element) { 
                                  $(element).attr("readonly", "readonly"); 
                             } 
                           },searchoptions: { sopt: ['eq'] }},
				{name:'last_name', label: 'Last Name', width: 200, editable: true,editrules: {required: true}, searchoptions: { sopt: ['eq', 'bw', 'ew', 'cn'] }},
				{name:'first_name', label: 'First Name', width: 200, editable: true,editrules: {required: true}, searchoptions: { sopt: ['eq', 'bw', 'ew', 'cn'] }},
				{name:'gender', label: 'Gender', width: 50, editable: true, edittype: 'select', editoptions:{value:{'M':'M','F':'F'}}, searchoptions: { sopt: ['eq'] } },
				{name:'hire_date', label: 'Hire Date', width: 200, editable: true, searchoptions: { sopt: ['eq','lt', 'gt'] }},
				{name:'birth_date', label: 'Birth Date', width: 200, editable: true,addoptions:{dataInit: function (elem) {$(input).datetimepicker();} }, searchoptions: { sopt: ['eq', 'lt','gt'] }}
				],
				caption: "Manager",
				pager : '#perPager',
				height: 'auto',
				 datatype: 'json',
			  jsonReader : {
				repeatitems:false,
				total: function(result) {
				  //Total number of pages
				  return Math.ceil(result.total / result.max);
				},
				records: function(result) {
				  //Total number of records
				  return result.total;
				}
			  },
			  prmNames: {rows: 'max', search: null},
			  height: 'auto',
			  viewrecords: true,
			  rowList: [10,20,50,100],
			  altRows: true,
			  loadError: function(xhr, status, error) {
				alert(error);
			  },
			  onSelectRow: function()
			  {
				var temp = "<div id='mess'><table>\n";
				temp+="<tr><td colspan='2'></td></tr>\n";
				temp+="<tr><td>Start Date:</td><td><input id='deptStartDate' type='Textbox'/></td></tr>";
				temp+="<tr><td>End Date:</td><td><input id='deptEndDate' type='Textbox'/></td></tr>";
				temp+="<tr><td id='errorMess' colspan='2'></td></tr>\n";
				temp+="</table></div>";
				$("#mainBody").append(temp);
				$( "#deptStartDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
				$( "#deptEndDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
				$('#mess').dialog({
				title:'Add selected employee to department?',
					modal: true,
					buttons : {
						"Yes": function() {
							if($( "#deptStartDate" ).val()!="" && $( "#deptStartDate" ).val()!="")
							{
								//$.post(URL + "/department/" + $('#addEmpDepGrid').jqGrid('getCell', rowId, 'dept_no') + "/"+$('#perGrid').jqGrid('getCell', rowId, 'emp_no')+"/"+$( "#deptStartDate" ).val()+"/"+$( "#deptEndDate" ).val(),function(res){
								$.post(URL + "/department/manager/" + $('#addEmpDepGrid').jqGrid('getCell', rowId, 'dept_no') + "/"+$('#perGrid').jqGrid('getCell', rowId, 'emp_no')+"?start="+$( "#deptStartDate" ).val()+"&start="+$( "#deptEndDate" ).val(),function(res){
										
									//close the grids
									//console.log('it fired');
									$('#mess').dialog("close");
									$('#mess').remove();
									$('#perGrid').trigger("reloadGrid");
								});
							}
							else
							{
								var error = "<div id='adddeptmess'><div class='alert alert-error'>\n<a class='close' href='#closedeptaddmess'>x</a>\n<strong>Error: </strong>Start date or End date not added\n</div></div>";
								$('#errorMess').append(error);
							}
						},
						"No" : function() {
							$(this).dialog("close");
							$('#mess').remove();
						} 
					}
				}); 
			  }
			};
			
			var searchOptions = {
				mtype: "GET",
			  width: 800
			};
			
			/*$( "#perDiv" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1050,
				height:900,
				top:20,
				close: function(event, ui) {$('#perDiv').remove();}
			});*/
			
			$("#perGrid")
				.jqGrid(options)
				.navGrid('#perPager',
				{edit:false,add:false,del:false, search:true}, //options
				{},
				{},
				{},
				{} // search options
			);
	}
	
	return add;
});