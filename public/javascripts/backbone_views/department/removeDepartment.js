define(['backbone'],function(Backbone){
	var remove = function(rowId)
	{
			//var dataFromCellByColumnIndex = jQuery('#list').jqGrid ('getCell', rowId, 7);
			//var dataFromCellByColumnName = jQuery('#list').jqGrid ('getCell', rowId, 'Tax');
			//console.log("fire here");
			var per = "<div id='perDiv'>";
			per+="<table id='perGrid'></table>";
			per+="<div id='perPager'></div>";
			per+="</div>";
			$("#perDiv").remove();
			$("#bodyWork").append(per);
			$("#perDiv").css('position','absolute').css('left',450).css('top',120);
			
			var URL = "/"+$.cookie('emp_no')+"/employee/department/"+$('#delEmpDepGrid').jqGrid('getCell', rowId, 'dept_no') ;
			var options = {
			  url: URL,
			  postData: {
					val: "search"
				},
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
				caption: "Select Employee",
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
			  onSelectRow: function(id){
			  //console.log("fired here");
			 	var temp = "<div id='mess'>Remove permission from employee?</div>";
				$("#mainBody").append(temp);
				$('#mess').dialog({
					modal: true,
					buttons : {
						"Yes": function() {
							
							$.post(URL + "/removeemployee/"+$('#perGrid').jqGrid('getCell', id, 'emp_no'),function(res){
								//close the grids
								$('#mess').dialog("close");
								$('#mess').remove();
								$('#perGrid').trigger("reloadGrid");
							});
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
				{edit:false,add:false,del:false, search: true}, //options
				{},
				{},
				{},
				searchOptions // search options
			);
	}
	
	return remove;
});