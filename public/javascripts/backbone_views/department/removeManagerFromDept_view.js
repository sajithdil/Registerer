define(['backbone','backbone_views/department/removeManager'],function (Backbone,remove) {

	var employee = Backbone.View.extend({
		initialize: function ()
		{
			
		},
		render: function()
		{
			//console.log(res);
			$("#addemployeetodepartment").removeClass('active');
			$("#removeemployeefromdepartment").removeClass('active');
			$("#addmanagertodepartment").removeClass('active');
			$("#removemanagerfromdepartment").addClass('active');
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','none');
			$("#bodyWork").empty();
			
			var table ="<div id='delEmpDep'>";
			table+="<table id='delEmpDepGrid'></table>";
			table+="<div id='delEmpDepPager'></div>";
			table+="</div>";
			$("#bodyWork").append(table);
			$("#delEmpDep").css('position','absolute').css('top',120);
			
			var URL = "/"+$.cookie('emp_no')+"/department";
			var options = {
			  url: URL,
				colModel:[
				{name:'dept_no', label: 'Department No', width: 100,editable:true,
				editoptions:{ 
                            dataInit: function(element) { 
                                  $(element).attr("readonly", "readonly"); 
                             } 
                           }},
				{name:'dept_name', label: 'Department Name', width: 300, editable: true,editrules: {required: true}},
			],
				caption: "Remove Employee From Department",
				pager : '#delEmpDepPager',
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
				//console.log("fired on select");
				remove(id);
			  }
			};
			
			/*$( "#delEmpDep" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1050,
				height:200,
				top:50,
				close: function(event, ui) {$('#delEmpDep').remove();}
			});*/
			
			$("#delEmpDepGrid")
				.jqGrid(options)
				.navGrid('#delEmpDepPager',
				{edit:false,add:false,del:false, search: false}, //options
				{},
				{},
				{},
				{} // search options
			);
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','block');
		}
	});
	
	return employee;
});