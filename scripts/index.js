$(document).ready(function(){

	function scrollToAnchor(anchor_id){
		var tag = $(anchor_id);
		$('html,body').animate({scrollTop: tag.offset().top}, 'slow');
	}

	/* Initialize navbar current link */
	var previous = $(".intro");
	previous.children("a").toggleClass("color");
	previous.data('clicked', true);

	$("li").click(function(){

		if (!$(this).data('clicked')) {
  			/* Change color */
			$(this).children("a").toggleClass("color");
			previous.children("a").toggleClass("color");

			/* Jump to location on page*/
			scrollToAnchor($(this).children("a").attr("href"));

			/* Stop link from jumping to the anchor first */
			event.preventDefault();
	  		event.stopPropagation();

	  		/* Update previous */
	  		previous.data('clicked', false);
	  		$(this).data('clicked', true);
	  		previous = $(this);

  		} else {
  			/* Stop link from jumping to the anchor first */
			event.preventDefault();
	  		event.stopPropagation();
  		}

	}); //end click

}); //EOF