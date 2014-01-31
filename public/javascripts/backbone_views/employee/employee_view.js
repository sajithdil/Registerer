define(['backbone'],function (Backbone) {

	var employee = Backbone.View.extend({
		initialize: function ()
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

				if(tempPer[val].MainPermission==3)
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
			var URL = "/"+$.cookie('emp_no')+"/employee";
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
				caption: "Employee",
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
			  },
			};
			
			
			var editOptions = {
				mtype: "POST",
			  onclickSubmit: function(params, postdata) {
				//console.log(params);
				params.url = URL + '/edit/' + postdata.emp_no + "/" + postdata.last_name 
				+ "/" + postdata.first_name + "/" + postdata.gender + "/" + postdata.hire_date + "/" + postdata.birth_date;
				console.log(params.url);
			  },
			  width: 600
			};
			var addOptions = {
				mtype: "PUT",
				onclickSubmit: function(params, postdata) {
				/*console.log(params);
				console.log(postdata);*/
				params.url = URL + "/undefined/" + postdata.last_name 
				+ "/" + postdata.first_name + "/" + postdata.gender + "/" + postdata.hire_date + "/" + postdata.birth_date;
			  },
			  width: 600
			};
			
			var delOptions = {
				mtype: "DELETE",
			  onclickSubmit: function(params, postdata) {
				/*console.log(params);
				console.log(postdata);*/
				params.url = URL + '/' + $('#grid').getCell (postdata, 'emp_no');
			  }
			};
			
			var searchOptions = {
				mtype: "GET",
				
			  onSearch: function() {
				/*console.log(params);*/
				//console.log();
				
				var url = $("#grid").jqGrid('getGridParam', 'url')+'/_search=search';
				$("#grid").jqGrid('setGridParam', url);
				console.log($("#grid").jqGrid('getGridParam', 'url'));
			  },
			  width: 800,
			  //multipleSearch:true,
			  afterSearch: function()
			  {
				//console.log("fired here");
				jQuery("#grid").jqGrid('setGridParam', URL);
			  }
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
			
			$("#Role").removeClass('open');
			$("#Department").removeClass('open');
			$("#Employee").addClass('open');
			$("#Report").removeClass('open');
		}
	});
	
	return employee;
});