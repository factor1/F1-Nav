/* Nifty Nav
* Author: Eric Stout / Factor1
* http://factor1studios.com
* Repo: https://github.com/factor1/nifty-nav
*/

// function we use to remove the mask
var niftyRemove = function(){
	$('.nifty-mask').remove();
};

var niftyUnMaskIt = function(){
	$('.nifty-mask').animate({opacity:0.0});
	setTimeout(niftyRemove, 800);
};

// setting up our variables for submenu toggles
var mobileNavItem = $('.nifty-panel ul li');
var $mobileClicked;

// when the document is ready lets go!
$(document).ready(function(){
	i = 0;
	// listen for the click on the menu icon
	$('#nifty-nav-toggle').click(function(){
		// Add 1 to the count
		i++;
		$('#nifty-nav-toggle').toggleClass('nifty-active');
		// toggle the nav up/down
		$('.nifty-panel').slideToggle(500).css("position", "absolute");
		// Check if the counter is even or odd
		var isEven = function(clickCounter){
			return (clickCounter%2 === 0) ? true : false;
		};

		if (isEven(i) === false){
			//lets create a nice mask to dim the content
			$('body').append('<div class="nifty-mask"></div>');
			$('.nifty-mask').animate({opacity:1.0});
		} else {
			niftyUnMaskIt();
		}

		// mask click collapses the nav
		$('.nifty-mask').click(function(){
			//slide up the nav panel
			$('.nifty-panel').slideUp(500);
			//remove the mask
			niftyUnMaskIt();
			// remove the active class on the hamburger mmmm hamburger
			$('#nifty-nav-toggle').removeClass('nifty-active');
			i++;  // Add 1 to the count
		});
	});
	// Close the nav when a nav item is clicked
	$('.nifty-nav-item').click(function(){
		//slide up our panel
		$('.nifty-panel').slideUp(500);
		niftyUnMaskIt();
		$('#nifty-nav-toggle').removeClass('nifty-active');
		i = 0;  // reset the counter
	});

	/*
	Listen for any menu items that have children and allow them
	to toggle open when clicked. This is by default setup for
	Wordpress menus, however if you're not using Wordpress just
	make sure your classes and structure matches.
	*/
	mobileNavItem.on('click', function(){
		$mobileClicked = $(this);
		$mobileClicked.find('.sub-menu').slideToggle();
		$mobileClicked.find('a').toggleClass('menu-opened');
	});
});
