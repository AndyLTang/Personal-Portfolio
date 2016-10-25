$(document).ready(function(){

	$("li").click(function(){
		$(this).children("a").toggleClass("color");
	});

}); //EOF