$(document).ready(function(){

	function scrollToAnchor(anchor_id){
		var tag = $(anchor_id);
		$('html,body').animate({scrollTop: tag.offset().top}, 'slow');
	}

	$("li").click(function(){
		/* Change color */
		$(this).children("a").toggleClass("color");

		/* Jump to location on page*/
		scrollToAnchor($(this).children("a").attr("href"));

		/* Stop link from jumping to the anchor first */
		event.preventDefault();
  		event.stopPropagation();
	});



}); //EOF