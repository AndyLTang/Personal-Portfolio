$(document).ready(function(){
    
	function scrollTo(anchor_id){
		var tag = $(anchor_id);
		$('html,body').stop().animate({scrollTop: tag.offset().top}, 'slow');
	}
    
    var $nav = $('nav');
    var $navlinks = $('nav a');
    
    /* Image preloading */
    var preloadImgs = new Array();
    for(i=0; i < 4; i++){
        var tmpImg = new Image();
        tmpImg.src = "images/project" + (i+1) + ".jpg";
        preloadImgs[i] = tmpImg;
    }
    
    /* Change navbar behaviour when scrolled */
    $(window).scroll(function(){
        if ($(document).scrollTop() <= 0){
            $nav.removeClass('drop-shadow');
            $nav.removeClass('invert-nav');
            $navlinks.removeClass('inverted');
        } else {
            $nav.addClass('drop-shadow');
            $nav.addClass('invert-nav');
            $navlinks.addClass('inverted');
        }   
    });
    
    /* Bind links to scrollTo */
	$navlinks.click(function(){
		/* Scroll to location on page*/
		var link = $(this).attr("href");
		scrollTo(link);

		/* Stop link from jumping to the anchor first */
		event.preventDefault();
  		event.stopPropagation();
	}); //end click
    
    var $nextbuttons = $('.button');
    $nextbuttons.click(function(){
        /* Scroll to location on page*/
		var link = $(this).attr("href");
		scrollTo(link);

		/* Stop link from jumping to the anchor first */
		event.preventDefault();
  		event.stopPropagation();
    });

    /* Responsive Navigation */
    var $responsivenav = $('#collapsed');
    $responsivenav.click(function(){
       $("nav #links li:not(:first-child)").slideToggle('fast');
    });
    
	/* Navigation highlight */
    /*
    var aChildren = $("#links li").children();
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
    */

    /* Projects */
    var $description = $('.description');
    var $project = $('#projects');
    
    $('.tile-wrapper').click(
        function(){
            //find the current article and remove it
            $description.find('.current').removeClass('current').stop().animate({opacity:0}, 'slow').hide();
            
            //change current to the article according to clicked image
            var selection = $(this).attr('data-link');
            $("article[data-link=" + selection + "]").addClass('current').stop().show().animate({opacity:1}, 'slow');

            switch (selection){
                case '1':
                    $project[0].style.backgroundImage = 'url("' + preloadImgs[0].src + '")';
                    break;
                case '2':
                    $project[0].style.backgroundImage = 'url("' + preloadImgs[1].src + '")';
                    break;
                case '3':
                    $project[0].style.backgroundImage = 'url("' + preloadImgs[2].src + '")';
                    break;
                case '4':
                    $project[0].style.backgroundImage = 'url("' + preloadImgs[3].src + '")';
                    break;
                default:
                    alert('error!');
                    break;
            }
        }
    );
    
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
    
    
    /*
    $('#bargraph li div').delay(2000).each(function(key, bar){
        var percent = $(this).data('percent');
        
        $(this).animate({'height' : percent + '%'}, 1500);
    });
    */
    
}); 
//EOF