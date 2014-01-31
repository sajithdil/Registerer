define(['backbone'],function (Backbone) {

	var employee = Backbone.View.extend({
		initialize: function ()
		{
			
		},
		render: function()
		{
			//console.log(res);
			$("#addreport").removeClass('active');
			$("#deletereport").addClass('active');
			
			var table ="<div id='delRep'>";
			table+="<table id='delRepGrid'></table>";
			table+="<div id='delRepPager'></div>";
			table+="</div>";
			$("#mainBody").append(table);
			
			var URL = "/"+$.cookie('emp_no')+"/report";
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
				caption: "Remove Report",
				pager : '#delRepPager',
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
			};
			
			var delOptions = {
				mtype: "DELETE",
			  onclickSubmit: function(params, postdata) {
				/*console.log(params);
				console.log(postdata);*/
				params.url = URL + '/' + $('#delRepGrid').getCell (postdata, 'emp_no');
			  }
			};
			
			$( "#delRep" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1050,
				height:200,
				top:50,
				close: function(event, ui) {$('#delRep').remove();}
			});
			
			$("#delRepGrid")
				.jqGrid(options)
				.navGrid('#delRepPager',
				{edit:false,add:false,del:true, search: false}, //options
				{},
				{},
				delOptions,
				{} // search options
			);
		}
	});
	
	return employee;
});