$(document).ready(function(){

	function scrollTo(anchor_id){
		var tag = $(anchor_id);
		$('html,body').stop().animate({scrollTop: tag.offset().top}, 'slow');
	}

	/* First page animations */
	$("nav").hide();
    $(".button").css({opacity: 0});
	$(".content-intro p").css({opacity: 0});
	$(".content-intro h1").css({opacity: 0}).animate({opacity: 1}, 1500, function(){
		$("p").animate({opacity: 1}, 1500, function(){
			$("nav").fadeIn(1500);
            $(".button").animate({opacity: 1}, 1500);
		});
	}); 

	/* Initialize navbar current link */
	var firstpage = $("#page1");
	firstpage.children("a").addClass("active");

	$("nav li").click(function(){
		/* Scroll to location on page*/
		var link = $(this).children("a").attr("href");
		scrollTo(link);

		/* Stop link from jumping to the anchor first */
		event.preventDefault();
  		event.stopPropagation();
	}); //end click
    
    $(".button").click(function(){
        /* Scroll to location on page*/
		var link = $(this).attr("href");
		scrollTo(link);

		/* Stop link from jumping to the anchor first */
		event.preventDefault();
  		event.stopPropagation();
    });

	/* Navigation highlight */
	var aChildren = $("nav li").children();
	var aArray = [];
	for (var i=0; i < aChildren.length; i++){
		var aChild = aChildren[i];
		var ahref = $(aChild).attr('href');
		aArray.push(ahref);
	}

	$(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("active");
            } else {
                $("a[href='" + theID + "']").removeClass("active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("active")) {
                var navActiveCurrent = $(".active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("active");
                $("nav li:last-child a").addClass("active");
            }
        }
    });
    
    /* Skills */
    $('#bargraph li div').each(function(key, bar){
        var percent = $(this).data('percent');
        
        $(this).animate({'height' : percent + '%'}, 2000);
    });
    
    /* Contact Form */
    var $contactForm = $('#contact-form');
    $contactForm.submit(function(e){
        var addr = 'andy' + '.' + 'l' + '.' + 'tang' + '@' + 'outlook' + '.' + 'com';
        var fulladdr = '//formspree' + '.' + 'io/' + addr;
        $contactForm.attr('action', fulladdr);
        
        e.preventDefault();
        $.ajax({
            url: fulladdr,
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function() {
                $contactForm.find(".response").text("Sending your message...");
                },
            success: function(data) {
                $contactForm.find(".response").text("Message sent!");
                $contactForm.find("#submit-btn").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 300);
                $contactForm.find("#submit-btn").prop("disabled", true);
                },
            error: function(err) {
                $contactForm.find(".response").text("Oops, something went wrong.");
                }
        });
    });
    
}); //EOF