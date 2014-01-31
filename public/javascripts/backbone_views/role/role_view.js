define(['backbone'],function(Backbone){

	var role = Backbone.View.extend({
		initialize: function()
		{
			
		},
		render: function(res)
		{
			//console.log(res);
			$("#bodyWork").empty();
			$("#bodyWork").append(res.views);
			
			var tempPer = 	JSON.parse($.cookie('permission'));
			//setting up the jqgrid
			
			var ad = false;
			var ed = false;
			var se = false;
			var de = false;
			

			for(var val in tempPer){

				if(tempPer[val].MainPermission==8)
				{
					//console.log(tempPer[val]);
					if(tempPer[val].extra=='C')
					{
						ad = true;
					}
					if(tempPer[val].extra=='U')
					{
						ed = true;
					}
					if(tempPer[val].extra == 'D')
					{
						de = true;
					}
					if(tempPer[val].extra == 'R')
					{
						se = true;
					}
				}
			}
			//console.log(de);
			//console.log(se);
			$("#bodyWork").css('left',30);
			$("#bodyWork").css('top',120);
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
				pager : '#pager',
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
			  }
			};
			
			var datePick = function(elem)
			{
				$(elem).datepicker();
			}
			
			var editOptions = {
				mtype: "POST",
			  onclickSubmit: function(params, postdata) {
				console.log(postdata);
				params.url = URL + '/edit/' + postdata.RoleID + "/" + postdata.RoleName;
			  },
			  width: 600
			};
			var addOptions = {
				mtype: "PUT",
				onclickSubmit: function(params, postdata) {
				params.url = URL + "/undefined/" + postdata.RoleName;
			  },
			  width: 600
			};
			
			var delOptions = {
				mtype: "DELETE",
			  onclickSubmit: function(params, postdata) {
				params.url = URL + '/' + $('#grid').getCell (postdata, 'RoleID');
			  }
			};
			
			var searchOptions = {
				mtype: "GET",
			  onclickSubmit: function(params, postdata) {
				params.url = URL + '/' + postdata;
			  },
			  width: 800,
			  multipleSearch:true
			};

			$("#grid")
				.jqGrid(options)
				.navGrid('#pager',
				{edit:ed,add:ad,del:de, search: se}, //options
				editOptions,
				addOptions,
				delOptions,
				searchOptions // search options
			);
			
			$("#Role").addClass('open');
			$("#Employee").removeClass('open');
			$("#Department").removeClass('open');
			$("#Report").removeClass('open');
		}
	});
	
	return role;
});