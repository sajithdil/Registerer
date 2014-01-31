define(['backbone'],function(Backbone){
var add = function(rowId,router)
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
			
			var URL = "/"+$.cookie('emp_no')+"/role";
			var options = {
			  url: URL,
				colModel:[
				{name:'RoleID', label: 'Role No', width: 100,editable:true,
				editoptions:{ 
                            dataInit: function(element) { 
                                  $(element).attr("readonly", "readonly"); 
                             } 
                           }},
				{name:'RoleName', label: 'Role Name', width: 300, editable: true,editrules: {required: true}},
				],
				caption: "Role",
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
			  onSelectRow: function(id)
			  {
				var temp = "<div id='mess'>Add Permission to selected role?</div>";
				$("#mainBody").append(temp);
				$('#mess').dialog({
					modal: true,
					buttons : {
						"Yes": function() {
							$.post(URL + "/addpermission/" + $('#addPerRoleGrid').jqGrid('getCell', rowId, 'PermissionID') + "/"+$('#perGrid').jqGrid('getCell', id, 'RoleID'),function(res){
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
				{edit:false,add:false,del:false, search:false}, //options
				{},
				{},
				{},
				{} // search options
			);
	}
	
	return add;
});