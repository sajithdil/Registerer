
/*
 BL to GET home page.
 */

define([],function (){
	var initHomePage = function(req, res){
		//console.log(seq);
		res.render('index');
	};
	
	return initHomePage;
});


//small test to see if sequelize worked
//this test wsa done before baseUrl was set
//test_seq tests after baseUrl has been set
/* 
define(['../sequelize_util/sequelize'],function (seq){
	var initHomePage = function(req, res){
		//console.log(seq);
		res.render('index', { title: 'Express' })
	};
	
	return initHomePage;
});
*/
