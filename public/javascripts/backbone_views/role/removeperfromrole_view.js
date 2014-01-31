define(['backbone','backbone_views/role/removePermission'],function (Backbone, remove) {

	var employee = Backbone.View.extend({
		initialize: function ()
		{
			
		},
		render: function()
		{
			//console.log(res);
			$("#addpermissiontorole").removeClass('active');
			$("#removepermissionfromrole").addClass('active');
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','none');
			$("#bodyWork").empty();
			
			var table ="<div id='delPerRole'>";
			table+="<table id='delPerRoleGrid'></table>";
			table+="<div id='delPerRolePager'></div>";
			table+="</div>";
			$("#bodyWork").append(table);
			$("#delPerRole").css('position','absolute').css('top',120);
			
			var URL = "/"+$.cookie('emp_no')+"/permission";
			var options = {
			  url: URL,
				colModel:[
				{name:'PermissionID', label: 'Permission ID', width: 200},
				{name:'PermissionName', label: 'Permission Name', width: 200}
			],
				caption: "Delete Permission From Role",
				pager : '#delPerRolePager',
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
				remove(id);
			  }
			};
			
			
			/*$( "#delPerRole" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1050,
				height:900,
				top:50,
				close: function(event, ui) {$('#delPerRole').remove();}
			});*/
			
			$("#delPerRoleGrid")
				.jqGrid(options)
				.navGrid('#delPerRolePager',
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