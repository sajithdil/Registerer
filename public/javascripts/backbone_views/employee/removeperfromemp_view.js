define(['backbone','backbone_views/employee/removePermission'],function (Backbone,remove) {

	var employee = Backbone.View.extend({
		initialize: function ()
		{
			
		},
		render: function(router)
		{
			//console.log(res);
			$("#addpermissiontoemployee").removeClass('active');
			$("#removepermissionfromemployee").addClass('active');
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','none');
			$("#bodyWork").empty();
			
			var table ="<div id='delPerEmp'>";
			table+="<table id='delPerGrid'></table>";
			table+="<div id='delPerPager'></div>";
			table+="</div>";
			$("#bodyWork").append(table);
			$("#delPerEmp").css('position','absolute').css('top',120);
			
			var URL = "/"+$.cookie('emp_no')+"/permission";
			var options = {
			  url: URL,
				colModel:[
				{name:'PermissionID', label: 'Permission ID', width: 200},
				{name:'PermissionName', label: 'Permission Name', width: 200}
			],
				caption: "Remove Permission From Employee",
				pager : '#delPerPager',
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
				remove(id,router);
			  }
			};
			
			
			
			/*$( "#delPerEmp" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1050,
				height:900,
				top:50,
				close: function(event, ui) {$('#delPerEmp').remove();}
			});*/
			
			$("#delPerGrid")
				.jqGrid(options)
				.navGrid('#delPerPager',
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