var MOBILE_RES = 800;

/* Determine window size */
var mobileWindow = true;

if($(window).width() > MOBILE_RES){
    mobileWindow = false;
}else{
    mobileWindow = true;
}

/* When window resizes, check if resolution is mobile size */
$(window).resize(function(){
    if($(window).width() > MOBILE_RES){
        mobileWindow = false;
    } else{
        mobileWindow = true;
    }
});

/* Image preloading projects images */
var preloadImgs = new Array();
for(i=0; i < 4; i++){
    var tmpImg = new Image();
    tmpImg.src = "images/project-bg-" + (i+1) + ".png";
    preloadImgs[i] = tmpImg;
}

$(document).ready(function(){
    
    /* Selector cache */
    var $nav = $('.navbar');
    var $navmenu = $('.navbar-menu');
    var $navitem = $('.navbar-item');
    var $navlinks = $('.navbar-link');
    var $collapse = $('.collapse');
    var $nextbutton = $('.button');
    var $card = $('.card');
    
	function scrollTo(anchor_id){
		var tag = $(anchor_id);
		$('html,body').stop().animate({scrollTop: tag.offset().top +2}, 'slow');
	}
    
    function bindScrollTo(link){
        link.click(function(){
            /* Scroll to location on page*/
            var ref = $(this).attr("href");
            scrollTo(ref);

            /* Stop link from jumping to the anchor first */
            event.preventDefault();
            event.stopPropagation();
        }); //end click
    }
    
    function addClassToElem(elemClass, elem){
        elem.addClass(elemClass);
    }
    
    function removeClassFromElem(elemClass, elem){
        elem.removeClass(elemClass);
    }
    
    /* Change transparent/opaque navbar */
    function changeNavbar(){
        $(window).scroll(function(){
            var invertBar = 'navbar--inverted';
            var invertMenu = 'navbar-menu--inverted';
            var invertLink = 'navbar-link--inverted';

            // if window is at the top, show transparent navbar
            if ($(document).scrollTop() <= 2){
                removeClassFromElem(invertBar, $nav);
                removeClassFromElem(invertMenu, $navmenu);
                //removeClassFromElem(invertLink, $navlinks);
            } 
            // otherwise, show opaque navbar
            else {
                addClassToElem(invertBar, $nav);
                addClassToElem(invertMenu, $navmenu);
                //addClassToElem(invertLink, $navlinks);
            }   
        });
    }
    
    /* Toggle hamburger menu icon */
    function toggleMenu(){
        $navmenu.click(function(){
            if ($navmenu.hasClass('rotated')){
                removeClassFromElem('rotated', $navmenu);
            } else {
                addClassToElem('rotated', $navmenu);
            }

            $collapse.slideToggle('fast'); 
        });

        $navlinks.click(function(){
            if (mobileWindow == true){
                removeClassFromElem('rotated', $navmenu);
                $collapse.slideToggle('fast');
            }
        });
    }
    
    /* Navigation highlight */
    function navHighlighting(){
        $("a[href='#intro']").addClass('active');
        var aChildren = $(".link");
        var aArray = [];
        for (var i=0; i < aChildren.length; i++){
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        }

        $(window).scroll(function(){
            // get the offset of the window from the top of page
            var windowPos = $(window).scrollTop(); 

            // get the height of the window
            var windowHeight = $(window).height(); 
            var docHeight = $(document).height();

            for (var i=0; i < aArray.length; i++) {
                var theID = aArray[i];

                // get the offset of the div from the top of page
                var divPos = $(theID).offset().top; 

                // get the height of the div
                var divHeight = $(theID).height();

                var ref = $("a[href='" + theID + "']");
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    addClassToElem("active", ref);
                } else {
                    removeClassFromElem("active", ref);
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

    }
    
    /* Fade project background when a tile is clicked on */
    function switchProjectBg(){
        $('.tile-wrapper').click(function(){
            //find the current article and remove it
            $card.find('.current').removeClass('current').animate({opacity:0}, 'slow').hide();

            //change current to the article according to clicked image
            var selection = $(this).attr('data-link');
            $("article[data-link=" + selection + "]").addClass('current').show().animate({opacity:1}, 'slow');

            switch (selection){
                case '1':
                    $card[0].style.backgroundImage = 'url("' + preloadImgs[0].src + '")';
                    break;
                case '2':
                    $card[0].style.backgroundImage = 'url("' + preloadImgs[1].src + '")';
                    break;
                case '3':
                    $card[0].style.backgroundImage = 'url("' + preloadImgs[2].src + '")';
                    break;
                case '4':
                    $card[0].style.backgroundImage = 'url("' + preloadImgs[3].src + '")';
                    break;
                default:
                    alert('error!');
                    break;
            }
        });
    }
    
    /* Submit form to formspree to email */
    function submitForm(){
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
    }
    
    /* Bind events to functions */
    bindScrollTo($navlinks);
    bindScrollTo($nextbutton);
    changeNavbar();
    toggleMenu();
    navHighlighting();
    switchProjectBg();
    submitForm();
    
}); 
//EOF