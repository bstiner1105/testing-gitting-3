
/*== Scroll to destination==*/
function scrollingTo(destination, duration){
	var distance,arrow, headerHeight = $('#header').outerHeight()-1;
	if(duration == undefined ? duration = 1000 : false);

	if(destination == 'top') {
		distance = 0;
		arrow = $('.arrow-up');
		arrow.hide();
		setTimeout(function(){
			arrow.removeAttr('style');
		},1000);
	} else  {
		distance = $('#'+destination).offset().top-headerHeight;
	}

	$('html, body').animate({scrollTop: distance}, duration);
}


/*== Show scroll to top button ==*/
function showScrollToTop(event) {
	var scrollPos = $(document).scrollTop(), windowHeight = $(window).height(), cls = 'is--shown', arrow = $('.arrow-up');

	if((windowHeight/2) < scrollPos ? arrow.addClass(cls) : arrow.removeClass(cls));
	// setTimeout(function(){
	// 	if((windowHeight/2) < scrollPos ? arrow.addClass(cls) : arrow.removeClass(cls));
	// },1000);


}

/*== Show scroll to top button ==*/
function scrollEvents(event) {

	/*== Show scroll to top button ==*/
	showScrollToTop(event);
	/*== Adds active state to main navigation on scroll position ==*/
	menuActiveScroll(event);
}


/*== Adds active state to main navigation on scroll position ==*/
function menuActiveScroll(event) {
	var scrollPos, cls = 'is--active', currLink, refElement, headerHeight, id = "";
	headerHeight = $('#header').outerHeight();
	scrollPos = $(document).scrollTop();
	$('.navigation-main__link').each(function () {
		currLink = $(this);
		id = currLink.attr("href");
		if (id != '#') {
			refElement = $('.block[data-section="'+id+'"]');
			if (refElement.position().top-headerHeight <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
			// if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight() - headerHeight  > scrollPos) {
				$('.navigation-main__item').removeClass(cls);
				currLink.parent().addClass(cls);
				// It currLink is 2nd Level item add class also to 1st level item
				if(currLink.parent().parent().parent().hasClass('navigation-main__item--has-submenu') == true) {
					currLink.parent().parent().parent().addClass(cls);
				}
			} else {
				currLink.parent().removeClass(cls);
			}
		}
	});
}



/*== Calculate Hero Height on mobile Homepage (because of Full screen - css '100vh' bug) ==*/
function fallbackHeroHeight(){
	if($('html').hasClass('touch') && $('.hero').width() != undefined){
		if(window.matchMedia("(min-width: 64em)").matches == true) {
			var windowHeight = $(window).height();
			var headerHeight = $('#header').outerHeight();
			$('.hero .bg-image').height(windowHeight-headerHeight);
		} else {
			$('.hero .bg-image').removeAttr('style');
		}
	}
}



function hide_privacy(cls) {
	$('.footer-navigation__link[data-destination="privacy"]').removeClass(cls);
	$('.legal').removeClass(cls).removeAttr('style');
}

$(document).ready(function() {

	/*== Hero height on touch devices (fallback)  ==*/
	fallbackHeroHeight();

	/*== Scroll events ==*/
	$(document).on("scroll", scrollEvents);


	/*== Toggle Button ==*/
	$('#nav-toggle').on('click', function (e) {
		e.preventDefault();
		var cls = 'navigation--is-open', body = $('body') ;
		body.toggleClass(cls);

		// Adding distance from top in moment of navigation opening
		// if(body.hasClass(cls) == true) {
		// 	var scrollDistance = $(window).scrollTop();
		// 	body.attr('data-scroll-top',scrollDistance);
		// } else {
		// 	body.removeAttr('data-scroll-top');
		// }

	});


	/*== Scrolling To Anchor click ==*/
	$('.anchor').click(function(e){
		e.preventDefault();
		var destination = $(this).data('destination');
		if(destination ? scrollingTo(destination) : false);
	});


	/*== Navigation To Anchor click ==*/
	$('.navigation-main__link').click(function(e){

		var mobile = window.matchMedia("(min-width: 80em)").matches;
		var destination = $(this).data('destination');
		if(mobile != true) {
			$('body').removeClass('navigation--is-open');
		}
		if(destination) {
			// Default Behaviour if item has data-destination
			e.preventDefault();
			scrollingTo(destination);
		}

	});


	$('.submenu-arrow').click(function(e){
		e.preventDefault();
		var cls = 'is--active',elder = $(this).parent();
		var submenu = elder.find('.navigation-main__lvl2');
		if(elder.hasClass(cls) == true) {
			submenu.slideUp(300, function(){
				elder.removeClass(cls);
				submenu.removeAttr('style');
			});
		} else {
			// elder.addClass(cls);
			elder.addClass('is--opening');
			submenu.slideDown(300, function(){
				elder.addClass(cls);
				elder.removeClass('is--opening');
				submenu.removeAttr('style');
			});
		}

	});



	/*== Slide Up/Down for Impressum/Datenschutz  ==*/
	$('.footer-navigation__link').click(function(e){
		e.preventDefault();
		var cls = 'open', causeState = $(this).hasClass(cls), destination = $(this).data('destination'), state = $('.legal'), headerHeight = $('#header').outerHeight();
		if (state.hasClass(cls) == true) {
			// Container is opened
			if(causeState == true) {
				// a tag has class open, close container
				state.slideUp(500);
				state.removeClass(cls);
				$(this).removeClass(cls);
			} else {
				// a tag doesnt have class open, scroll to a tag anchor
				$('.footer-navigation__link').each(function(){
					$(this).removeClass(cls);
				});
				$(this).addClass(cls);
				var distance = $('#'+destination).offset().top-headerHeight;
				$('html, body').animate({scrollTop: distance}, 1000);
			}
		} else {
			$(this).addClass(cls);
			state.slideDown(500);
			state.addClass('open');
			var distance = $('#'+destination).offset().top-headerHeight;
			$('html, body').animate({scrollTop: distance}, 1000);
		}
	});


	/*== Close button for Impressum/Datenschutz ==*/
	$('.close-button').click(function(e){
		e.preventDefault();
		$('.legal').slideUp(400, function(){
			$('.legal').removeClass('open');
			$('.footer-navigation__link').each(function(){
				$(this).removeClass('open');
			});
		});

	});

	/*== Window Resize event ==*/
	jQuery(window).on('resize',function(){
		/*== Hero height on touch devices (fallback)  ==*/
		fallbackHeroHeight();
	});


	/*==  Webfonts ==*/
/*	WebFontConfig = {
		custom: {
			families: ['ProximaNova-Light', 'ProximaNova-Bold'],
			urls: ['assets/fonts/fonts.css'],
		},

		// Show cookie if needed only after fonts are loaded
		active: function () {
			//show_cookie_accept();
		}

	};

	(function (d) {
		var wf = d.createElement('script'),
			s = d.scripts[0];
		wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
		//s.parentNode.insertBefore(wf, s);
		jQuery('body').append(wf);
	})(document);
*/


	/*== Hide/remove open classes for Datenschutz , fallback for noJS ==*/
	hide_privacy('open');

});// document.ready
