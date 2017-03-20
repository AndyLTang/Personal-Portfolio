$(document).ready(function(){
    
    var mobileWindow = true;
    
    /* detect screen size */
    if($(window).width() > 666){
        mobileWindow = false;
    }else{
        mobileWindow = true;
    }
    
    $(window).resize(function(){
        if($(window).width() > 666){
            mobileWindow = false;
        } else{
            mobileWindow = true;
        }
    });
    
	function scrollTo(anchor_id){
		var tag = $(anchor_id);
		$('html,body').stop().animate({scrollTop: tag.offset().top +2}, 'slow');
	}
    
    /* Image preloading */
    var preloadImgs = new Array();
    for(i=0; i < 4; i++){
        var tmpImg = new Image();
        tmpImg.src = "images/project-bg-" + (i+1) + ".png";
        preloadImgs[i] = tmpImg;
    }
    
    
    /* Change navbar behaviour when scrolled */
    var $nav = $('.navbar');
    var $navlinks = $('.navbar-link');
    var $navmenu = $('.navbar-menu');
    var $brandname= $('.branding');
    
    $(window).scroll(function(){
        if ($(document).scrollTop() <= 2){
            $nav.removeClass('navbar--inverted');
            $navlinks.removeClass('navbar-link--inverted');
            $navmenu.removeClass('navbar-menu--inverted');
            $brandname.removeClass('branding--inverted');
        } else {
            $nav.addClass('navbar--inverted');
            $navlinks.addClass('navbar-link--inverted');
            $navmenu.addClass('navbar-menu--inverted');
            $brandname.addClass('branding--inverted');
        }   
    });
    
    
    /* Toggle hamburger menu */
    var $navitem = $('.navbar-item');
    
    $navmenu.click(function(){
       $navitem.slideToggle('fast'); 
    });
    
    $navlinks.click(function(){
        if (mobileWindow == true){
            $navitem.slideToggle('fast');
        }
    })
    
    
    /* Bind links to scrollTo */
	$navlinks.click(function(){
		/* Scroll to location on page*/
		var link = $(this).attr("href");
		scrollTo(link);

		/* Stop link from jumping to the anchor first */
		event.preventDefault();
  		event.stopPropagation();
	}); //end click
    
    /* Bind buttons to scrollTo */
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
    $(".navbar-link[href='#intro']").addClass('active');
    var aChildren = $(".navbar-item").children(".navbar-link");
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


        // if window is at bottom of page, set active to last link
        if(windowPos + windowHeight == docHeight) {
            if (!$(".navbar-item:last-child a").hasClass("active")) {
                var navActiveCurrent = $(".active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("active");
                $(".navbar-item:last-child a").addClass("active");
            }
        } 
    });

    
    /* Projects */
    var $project = $('.projects-bg');
    var $infobar = $('.infobar');
    
    $('.tile-wrapper').click(
        function(){
            //find the current article and remove it
            $infobar.find('.current').removeClass('current').animate({opacity:0}, 'slow').hide();
            
            //change current to the article according to clicked image
            var selection = $(this).attr('data-link');
            $("article[data-link=" + selection + "]").addClass('current').show().animate({opacity:1}, 'slow');

            switch (selection){
                case '1':
                    $infobar[0].style.backgroundImage = 'url("' + preloadImgs[0].src + '")';
                    break;
                case '2':
                    $infobar[0].style.backgroundImage = 'url("' + preloadImgs[1].src + '")';
                    break;
                case '3':
                    $infobar[0].style.backgroundImage = 'url("' + preloadImgs[2].src + '")';
                    break;
                case '4':
                    $infobar[0].style.backgroundImage = 'url("' + preloadImgs[3].src + '")';
                    break;
                default:
                    alert('error!');
                    break;
            }
        }
    );
    
    
    /* Contact Form */
    var $contactForm = $('.form');
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
                $contactForm.find(".form-response").text("Sending your message...");
                },
            success: function(data) {
                $contactForm.find(".form-response").text("Message sent!");
                $contactForm.find(".form-submit").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 300);
                $contactForm.find(".form-submit").prop("disabled", true);
                },
            error: function(err) {
                $contactForm.find(".response").text("Oops, something went wrong.");
                }
        });
    });
    
    
}); 
//EOF