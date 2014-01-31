define(['backbone','backbone_views/role/addPermission'],function (Backbone,add) {

	var employee = Backbone.View.extend({
		initialize: function ()
		{
			
		},
		render: function(router)
		{
			//console.log(res);
			$("#addpermissiontorole").addClass('active');
			$("#removepermissionfromrole").removeClass('active');
			
			$("#bodyWork").stop(true,true).effect('slide',1000).css('display','none');
			$("#bodyWork").empty();
			
			var table ="<div id='addPerRole'>";
			table+="<table id='addPerRoleGrid'></table>";
			table+="<div id='addPerRolePager'></div>";
			table+="</div>";
			$("#bodyWork").append(table);
			$("#addPerRole").css('position','absolute').css('top',120);
			
			var URL = "/"+$.cookie('emp_no')+"/permission";
			var options = {
			  url: URL,
				colModel:[
				{name:'PermissionID', label: 'Permission ID', width: 200},
				{name:'PermissionName', label: 'Permission Name', width: 200}
			],
				caption: "Add Permission To Role",
				pager : '#addPerRolePager',
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
				add(id,router);
			  }
			};
			
			/*$( "#addPerRole" ).dialog({
				show: "blind",
				hide: "explode",
				width: 1050,
				height:900,
				top:20,
				close: function(event, ui) {$('#addPerRole').remove();}
			});*/
			
			$("#addPerRoleGrid")
				.jqGrid(options)
				.navGrid('#addPerRolePager',
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