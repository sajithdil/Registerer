define(['backbone','backbone_views/department/addManager'],function (Backbone,add) {

	var employee = Backbone.View.extend({
		initialize: function ()
		{
			
		},
		render: function()
		{
			//console.log(res);
			$("#addemployeetodepartment").removeClass('active');
			$("#removeemployeefromdepartment").removeClass('active');
			$("#addmanagertodepartment").addClass('active');
			$("#removemanagerfromdepartment").removeClass('active');
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','none');
			$("#bodyWork").empty();
			
			var table ="<div id='addEmpDep'>";
			table+="<table id='addEmpDepGrid'></table>";
			table+="<div id='addEmpDepPager'></div>";
			table+="</div>";
			$("#bodyWork").append(table);
			$("#addEmpDep").css('position','absolute').css('top',120);
			
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
				caption: "Add Manager To Department",
				pager : '#addEmpDepPager',
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
			  onSelectRow: function(id)
			  {
				//console.log("fier me");
				add(id);
			  }
			};
			
			/*$( "#addEmpDep" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1200,
				height:900,
				top:10,
				close: function(event, ui) {$('#addEmpDep').remove();}
			});*/
			
			$("#addEmpDepGrid")
				.jqGrid(options)
				.navGrid('#addEmpDepPager',
				{edit:false,add:false,del:false, search: false}, //options
				{},
				{},
				{},
				{} // search options
			);
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','block');
			
		},
		closeAddMessage: function()
		{
			$("#adddeptmess").stop(true,true).effect('slide',1000).css('display','none');
			$("#adddeptmess").remove(0);
		}
	});
	
	return employee;
});