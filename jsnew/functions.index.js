// =======================================================
//                GLOBAL VARIABLES
// -------------------------------------------------------
var scrollPages = [],
	pagesCreated = false;

// =======================================================
//           GLOBAL DOCUMENT FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var IndexFunctions = function() {
	var _this = this;
	
	// standard functions to load on global dom is ready
	_this.documentReady = function() {
		
		/*
		//image swap main hex
		setInterval(function () {

			var imgDisp = parseInt($('.btn-hex-main').attr('data-img'));

			if(imgDisp == 1){
				$('.btn-hex-main').attr('data-img', 2)
			}else{
				$('.btn-hex-main').attr('data-img', 1)
			};

		}, 3000);
		*/
	
		//genratrSetURL('/home/');
		
		if(!params.target){
			$('[data-overlay="loading"]').removeClass('hide');
			$('[data-overlay="loading"]').addClass('show');
			calcHex();
		} else {
			$('[data-overlay="loading"]').remove();
		};
		getPages();
		
		// open page loading screens
		//initPageLoad();
		
		// trigger for when all page content has been loaded
		$(document).on('GENERATR_COMPLETE', buildPageCarousel);
		// this still to be refactored and turned into smaller functions
		// Change faux url on click 
		//$('[data-genratrTarget]').on('click', pushUrl(event, this));
			
		_this.documentEvents();	// setup dom element event listeners
		
	};
	// standard functions to load/refresh on global dom is resized
	_this.documentResize = function() {

	};
	_this.documentEvents = function() {

		$(document).on('USERAGENT_INFO_LOADED', function() {
			setTimeout(function () {
				initPageLoad();
			}, 1000);
		});
		
		$(document).on('click', '.btn-continue', function(event){
			event.preventDefault();
			initPageLoad();
		});
	};
	
};

var indexInstance = indexInstance || new IndexFunctions();

/**
 * Set classes for load animations and remove elements when complete
 */
function initPageLoad(timing) {
	timing = timing || 1000;
	
	if($('[data-overlay="loader"]').length > 0){
		setTimeout(function(){
			$('[data-overlay="loader"]').remove();
		}, 2000	);
	}
	//this should be done with css transistion-delay rather then with js
	setTimeout(function () {
		$('html').removeClass('delayload');
	}, (500));
	
	$('body').addClass('openLoad');
	$('html').addClass('loaded');
	
	setTimeout(function () {
		$('[data-overlay="loading"]').remove();
	}, timing * 2);
	
};

function getPages() {
	scrollPagesQty	= $('.pg-wrapper > section > article').length;
	for (var i = 0; i < scrollPagesQty; i++) {
		
		var self	= $('.pg-wrapper > section > article:eq(' + i + ')');
		
		scrollPages.push({
			_details: {				
				name: $(self).attr('data-title'),
				status: null
			},
			_size: {
				x: $(self).width(),
				y: $(self).height()
			},
			_position: {			
				x: $(self).offset().left,
				y: $(self).offset().top	
			}
		});
		pageWidth = pageWidth + scrollPages[i]._size.x;
	};
};


function buildPageCarousel() {
	
	//init main page carousel
	
	pageScroll = new IScroll('.pg-wrapper', {
		snap: true,
		momentum: false,
		eventPassthrough: true,
		scrollX: true,
		scrollY: false,
		disableMouse: true,
		disablePointer: true,
		disableTouch: true,
		probeType: 3
		
	});
	pagesCreated = true;
	$(document).trigger('PAGES_CREATED');
	
	pageScroll.on('scrollStart', function() {
		$('html').addClass('grabbing');
		$('.scrollNav, .pageNav').addClass('disabled');
		
		setStartPage(this.currentPage.pageX);
		
		getScrollingStatus(this.currentPage.pageX);
		$('html').removeClass('scroll-done');
	});
	
	pageScroll.on('scrollEnd', function() {
		$('html').removeClass('grabbing');
		getScrollingStatus(this.currentPage.pageX, this.x);
		
		$('html').addClass('scroll-done');
		$('.scrollNav, .pageNav').removeClass('disabled');
	});
	
	pageScroll.on('scroll', function() {
		getScrollingStatus(this.currentPage.pageX, this.x);
	});
	
	setStageStatus(0);
	
}

function calcHex() {
	$('.hex').remove();
	
	var hex = {
			size: 60,
			spacing: 4
		};
	
	$('.hexbg').each( function() {
		var	hexStage = {
				x: $(this).width(),
				y: $(this).height()	
		}
		
		hexStage.cols = Math.ceil((hexStage.x / (hex.size + (hex.spacing * 2))) + 2);
		hexStage.rows = Math.ceil((hexStage.y / (hex.size + (hex.spacing * 2))) * 2) + 2;
		
		var direction = $(this).attr('data-startFrom') || 'top';
		
		drawHexs(hexStage.rows, this, direction, hex.size, hexStage.cols);
		
	});
	
}

function drawHexs(qty, elem, direction, size, cols) {

	for (var ri = 0; ri < qty; ri++) {
		
		var evenodd = isEven(ri) === true ? 'even' : 'odd';
		
		if(direction == 'top') {
			var hexOffset = ri * 31.5 - 30;
		} else {
			var hexOffset = ri * 31.5 + 30;
		}
		
		for (var i = 0; i < cols; i++) {
			$(elem).append('<span class="hex ' + evenodd + '" style="' + direction + ': ' + hexOffset + 'px; left: ' + (i * (size + (size / 2) + 20)) + 'px"><em></em></span>'); //''
		}
		
	};
	
};

// =======================================================
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(indexInstance.documentReady());
$(window).resize(indexInstance.documentResize());

