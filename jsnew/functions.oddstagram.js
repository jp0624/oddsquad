var galleryLoaded = false,
	galleryCreated = false;

// =======================================================
//              AWARDS PAGE LISTENERS
// -------------------------------------------------------

//page and window specific listeners
$(document).ready(galleryFunctions.documentReady);
$(window).resize(galleryFunctions.documentResize);


// =======================================================
//              AWARDS PAGE LOAD FUNCTIONS
// -------------------------------------------------------

/**
 * @create {Object} Set available global functions on page events. 
 */
var galleryFunctions = function() {
	
	// standard functions to load on global dom is ready
	this.documentReady = function() {

		getGallery()
		this.documentEvents();	// setup dom element event listeners
		
	};
	
	// standard functions to load/refresh on global dom is resized
	this.documentResize = function() {
		
	};
	
	this.documentEvents = function() {
		// global event listeners for dynamicly created content post dom
		
		$(document).on('GALLERY_LOADED', function(event) {
			buildGallery();
		});
		$(document).on('GALLERY_CREATED', function(event) {
	
		});
	};
	
};
/**
 * Get awards details from json doc and set trigger when succesful
 * @return {Object}  - [site] An object containing award details to be used throughout the site.
 */
function getGallery() {
	if(!awardsLoaded) {
		copyJSONIntoObject('/oddsquad/json/gallery.json', site, getGalleryComplete());	
	}else{
		getGalleryComplete();
	};	
}
/**
 * Function to fire when json has load has completed.
 */
function getGalleryComplete() {
	galleryLoaded = true;
	$(document).trigger('GALLERY_LOADED');	
}


//build gallery
function buildGallery() {
	// specify the main carousel container
	var container	= $('.wallpapers-lst');
	
	// build the html for the gallery carousel from the json data
	for (i = 0; i < site.gallery.length; i++) {
		var cleanGallery = (site.gallery[i].name).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
		
		site.gallery[i].hashs = site.gallery[i].hashs.split(',');
		
		$(container).append('<li data-gallery="' + i + '"><div class="sizer"></div><div class="sized"><img src="/oddsquad'+ site.gallery[i].src +'"><img src="/oddsquad/img/global/btn-console-background.png" title="Set this image as your main background image" alt="Set this image as your main background image" class="set-background" data-bgnum="' + site.gallery[i].bgnum + '"><span class="hashs"> </span></div></li>');
		for (h = 0; h < site.gallery[i].hashs.length; h++) {
			$('[data-gallery="' + i + '"]').find('.hashs').append('<em>#<em>'+site.gallery[i].hashs[h]);
		};
		
	};
	
	// Initiate the gallery iscroll carousel
	galleryScroll = new IScroll('.wallpapers-wrapper', {
		snap: true,
		momentum: false,
		scrollX: true,
		scrollY: false,
		probeType: 3,
		tap: true	
	});  
	
	galleryScroll.on('scrollStart', function() {
		$('.wallpapers-lst').removeClass('scrollStart scrollEnd');
		$('nav.door1-open').removeClass('scrollStart scrollEnd');
	});
	galleryScroll.on('scrollEnd', function() {
		$('.wallpapers-lst').removeClass('scrollStart scrollEnd');
		$('nav.door1-open').removeClass('scrollStart scrollEnd');
		
		//console.log(this.currentPage.pageX);
		if(this.currentPage.pageX == 0) {
			$('.wallpapers-lst').addClass('scrollStart');
			$('nav.door1-open').addClass('scrollStart');
			
		} else if(this.currentPage.pageX == site.gallery.length-1) {
			$('.wallpapers-lst').addClass('scrollEnd');
			$('nav.door1-open').addClass('scrollEnd');
			
		}
		
	});
	
	galleryCreated = true;
	$(document).trigger ('GALLERY_CREATED');
}