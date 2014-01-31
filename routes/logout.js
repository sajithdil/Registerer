define([],function (){
	var initHomePage = function(req, res){
		req.session.emp_no = undefined;
		req.session.permission = undefined;
		res.render('index');
	};
	
	return initHomePage;
});
