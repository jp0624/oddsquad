var passwordComplete = false;

// =======================================================
//              WALL OF AGENTS PAGE LISTENERS
// -------------------------------------------------------

(function($) {
  $.fn.nodoubletapzoom = function() {
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);
// =======================================================
//              AWARDS PAGE LOAD FUNCTIONS
// -------------------------------------------------------


$(document).ready( function() {
	getWinSize();
	getOrientationOf('html');
});
window.onresize = function(event) {
	getWinSize();
	getOrientationOf('html');
};

/**
 * @create {Object} Set available global functions on page events. 
 */
var olFunctions = function() {
	
	// standard functions to load on global dom is ready
	this.documentReady = function() {
		initCanvas();

		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
		    $('html').addClass('ie ie9 lte9 lte10');
		}

		setTimeout( function() {
			$('body').addClass('loaded');
		}, 250);

        $(document).on('click', '.lockerItem-photoMso', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			var audio = $('.locker-audio-modal').get(0);
			audio.play();
			$('.photo-mso').addClass('active');
			$('.popup-wrapper').addClass('active');
        });
        $(document).on('click', '.photo-mso, .popup-wrapper', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			$('.photo-mso').removeClass('active');
			$('.popup-wrapper').removeClass('active');
        });

        $(document).on('click', '.lockerItem-photoDance', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			var audio = $('.locker-audio-modal').get(0);
			audio.play();
			$('.photo-dance').addClass('active');
			$('.popup-wrapper').addClass('active');
        });
        $(document).on('click', '.photo-dance, .popup-wrapper', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			$('.photo-dance').removeClass('active');
			$('.popup-wrapper').removeClass('active');
        });

        $(document).on('click', '.lockerItem-posterSoundcheck', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			var audio = $('.locker-audio-modal').get(0);
			audio.play();
			$('.photo-poster').addClass('active');
			$('.popup-wrapper').addClass('active');
        });
        $(document).on('click', '.photo-poster, .popup-wrapper', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			$('.photo-poster').removeClass('active');
			$('.popup-wrapper').removeClass('active');
        });

        $(document).on('click', '.lockerItem-calendar', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			var audio = $('.locker-audio-modal').get(0);
			audio.play();
			$('.photo-calendar').addClass('active');
			$('.popup-wrapper').addClass('active');
        });
        $(document).on('click', '.photo-calendar, .popup-wrapper', function(event){
        	event.preventDefault();
        	event.stopPropagation();
			$('.photo-calendar').removeClass('active');
			$('.popup-wrapper').removeClass('active');
        });





        $(document).on('click', '.popup-wrapper .popup-item a', function(event){
        	event.stopPropagation();
        });


        $(document).on('click', '.lockerItem-holderPencils', function(event){
        	event.stopPropagation();
			$('.lockers-wrapper').removeClass('locker-open');

			var audio = $('.locker-audio-close').get(0);
			audio.play();

		});

        $(document).on('click', '.locker-olympia .locker-name, .locker-olympia .locker-keypad, .locker-olympia .door-front', function(event){
        	event.stopPropagation();
			$('.lockers-wrapper').addClass('locker-open');

			var audio = $('.locker-audio-open').get(0);
			audio.play();
		});

        $(document).on('mouseenter', 'a.lockerItem.lockerItem-calendar', function(event){
        	if( $(this).find('canvas').length == 0 ) {
        		return;
        	}
        	var _mycanvas = $(this).data('jsname').trim();
        	// console.log('canvas id: ', _mycanvas);

        	var mc = window[_mycanvas];
        		mc.play();
        		//mc.gotoAndStop(0);
        });
        $(document).on('mouseleave', 'a.lockerItem.lockerItem-calendar', function(event){
        	if( $(this).find('canvas').length == 0 ) {
        		return;
        	}
        	var _mycanvas = $(this).data('jsname').trim();
        	// console.log('canvas id: ', _mycanvas);

        	var mc = window[_mycanvas];
        		//mc.play();
        		mc.gotoAndStop(0);
        });

        $(document).on('click', 'a.lockerItem:not(.lockerItem-calendar)', function(event){

        	if( $(this).find('canvas').length == 0 ) {
        		return;
        	}

        	var _mycanvas = $(this).data('jsname').trim();
        	// console.log('canvas id: ', _mycanvas);

        	var mc = window[_mycanvas];

        	if (mc.paused) {
        		mc.play();
				
				if($(this).find('.lockerIten-audio').length){
					var audio = $(this).find('.lockerIten-audio').get(0);
					audio.play();
				}
        	} else {
        		mc.gotoAndStop(0);

				if($(this).find('.lockerIten-audio').length){
					var audio = $(this).find('.lockerIten-audio').get(0);
					audio.pause();
					audio.currentTime = 0;
				}
        		//mc.stop();
        	}


        });

        $(document).on('click', '.key-num', function(event){

        	var keySounds = ['a','b','c'];
			// console.log('keySounds: ', keySounds);

        	// console.log('clicked');
			var digitalDisp = $('.display-wrapper span');
			var keypadWrapper = $('.login-wrapper');


			var keyVal = parseInt($(this).attr('data-value'));

        	// console.log('digitalDisp: ',digitalDisp);
        	// console.log('keyVal: ', keyVal);

			digitalDisp.append(keyVal);

			var keySoundEffect = Math.floor(Math.random() * keySounds.length);
			keySoundEffect = keySounds[keySoundEffect];

			// console.log('keySoundEffect: ',keySoundEffect );


			var audio = $('.locker-audio-key' + keySoundEffect ).get(0);
			audio.play();

			// console.log('digitalDisp.text().length: ', digitalDisp.text().length);

			if(digitalDisp.text().length >= 3) {
				
				keypadWrapper.addClass('full');
				checkPassword();

			}

        });

	};
	// standard functions to load/refresh on global dom is resized
	this.documentResize = function() {
		
	};
	
	this.documentEvents = function() {
		// global event listeners for dynamicly created content post dom
	
	};
	
};
function checkPassword() {

	var audio;

	var digitalDisp = $('.display-wrapper span');
	var keypadWrapper = $('.login-wrapper');
	
	keypadWrapper.removeClass('error');

	if(digitalDisp.text() == '365'){
		keypadWrapper.addClass('success');
		// console.log('password correct');

		audio = $('.locker-audio-unlock').get(0);
		audio.play();

        setTimeout(function(){
        	$('.lockers-wrapper').addClass('locker-open');

			var audio = $('.locker-audio-open').get(0);
			audio.play();

        }, 500);
		
	} else {
		keypadWrapper.addClass('error');
		// // console.log('wrong password');

		audio = $('.locker-audio-error').get(0);
		audio.play();

        setTimeout(function(){
			keypadWrapper.removeClass('full');
			keypadWrapper.removeClass('error');

			digitalDisp.text('');
        }, 1000);

	}

};

var olInstance = olInstance || new olFunctions();


//page and window specific listeners

$(document).ready(olInstance.documentReady);
$(window).resize(olInstance.documentResize);
