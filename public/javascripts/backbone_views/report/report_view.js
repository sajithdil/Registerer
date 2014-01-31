define(['backbone'],function(Backbone){

	var department = Backbone.View.extend({
		initialize: function()
		{
			
		},
		render: function(res)
		{
			//console.log(res);
			$("#bodyWork").empty();
			$("#bodyWork").append(res);
			
			$("#bodyWork").css('left',30);
			$("#bodyWork").css('top',120);
			var URL = "/"+$.cookie('emp_no')+"/report";
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
				caption: "Report",
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
				//console.log(params);
				params.url = URL + '/edit/' + postdata.dept_no + "/" + postdata.dept_name;
			  },
			  width: 600
			};
			var addOptions = {
				mtype: "PUT",
				onclickSubmit: function(params, postdata) {
				params.url = URL + "/undefined/" + postdata.dept_name;
			  },
			  width: 600
			};
			
			var delOptions = {
				mtype: "DELETE",
			  onclickSubmit: function(params, postdata) {
				params.url = URL + '/' + $('#grid').getCell (postdata, 'dept_no');
				//console.log(params.url);
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
				{edit:false,add:false,del:false, search: false}, //options
				editOptions,
				addOptions,
				delOptions,
				searchOptions // search options
			);
			
				$("#Role").removeClass('open');
				$("#Employee").removeClass('open');
				$("#Department").removeClass('open');
				$("#Report").addClass('open');
			
		}
	});
	
	return department;
});