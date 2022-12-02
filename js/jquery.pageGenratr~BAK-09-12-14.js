// JavaScript Document
var genratrbuiltTot = 0,
	genratrbuildTot = 0;

function genratrGrab(container) {
	
	genratrbuildTot = $(container).find('[data-genratr]').length;
		
	console.log('number of pages to load: ', genratrbuildTot);
	
	$('[data-genratr]').each(function() {
		var url			= $(this).attr('data-genratr'),
			selector	= '[data-genratr-wrapper]',
			target		= this;
			
		genratrLoad(url, selector, target);
		
	});
	
};
function genratrLoad(url, selector, target) {
	if(genratrbuildTot == 0){
		genratrbuildTot++
	};
	
	var $eventDispatcher = $ ( {} );
	
	$(target).load(url + ' ' + selector, function(response, status, xhr) {
		
		if(status == "error" ) {
			$(target).html('Could not load: ' + url + ' ' + xhr.status + " " + xhr.statusText);
			return;
		};
		
		genratrbuiltTot++		
			
		if(genratrbuildTot == genratrbuiltTot) {			
			genratrbuiltTot = 0;
			genratrbuildTot = 0;

			//init content functions for new loaded content
			buildContent();
		};
		
		$eventDispatcher.trigger ( "COMPLETE" );
	});
	
	return $eventDispatcher;
}

function genratrSetURL(url, title, _replace) {
	
	var location 	= window.history.location || window.location,
		stateObject = {};
		
	//detect what to use as base origin
	if($('.lte9').exists() == true) {
		var origin		= location.protocol + '//' + location.host;
	} else {
		//site needs subfolder in lte9 browsers && relates to .htaccess (BOTH need to change if folder changes)
		var origin		= location.protocol + '//' + location.host + '/oddsquad';
	}
	
	//detect wether should create new history item
	if(_replace == true) {
		history.replaceState(stateObject, title, origin + url);
	} else {
		history.pushState(stateObject, title, origin + url);
	}
	
	//check target url for /'s
	var targetUrl = [];
	for(var i=0; i < url.length; i++) {
		if (url[i] === '/') {
			targetUrl.push(i)
		};
	};
	
	//if /'s are at front and/or end remove to clean up array
	var target = url.indexOf('/') == 0 && url[(url.length-1)] == '/' ? url.substring(1, url.length-1) : url.indexOf('/') == 0 ? url.substring(1) : url[(url.length-1)] == '/' ? url.substring(0, url.length-1) : url;
	var target = target.split('/');
	
	/*
	console.log(target[0]);
	console.log('targetUrl: ', targetUrl);
	console.log(target.length);
	console.log('target: ', target);
	console.log('pages: ', scrollPages.length);
	console.log('page name: ', scrollPages[i]._details.name);
	console.log('params: ', params);
	*/
	
	for(var i=0; i < scrollPages.length;i++) {
		if(scrollPages[i]._details.name == target[0]){
			
			if(target.length > 1) {
				$('body').append('<div class="ov-wrapper" data-type="' + target[1] + '"></div>');
				var $eventDispatcher = genratrLoad('/oddsquad/' + target[0] + '/' + target[1] + '/index.html', '[data-genratr-wrapper]', '.ov-wrapper[data-type="' + target[1] + '"]')
				
				$eventDispatcher.on ( { "COMPLETE" : function ( event ) {
					$(document).trigger ('OVERLAY_CREATED', target[1]);
				} });
				
			};

			if(params !== undefined) {
				//check if linked to from static page and goto section without animation
				gotoStage(i, 50)
				params = undefined;
			} else {
				gotoStage(i, 500)
			};
		};
	};
	
};
function genratrCheckURL() {
	var urlParam = location.search.substring(1);

	urlParam = urlParam?JSON.parse('{"' + urlParam.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
    	function(key, value) { return key===""?value:decodeURIComponent(value) }):{};
	
	var params = jQuery.isEmptyObject(urlParam);
	
	if(params == true){
		return;
	} else {
		return [params, urlParam];
	}

}

function initOverlay(title, type, value) {
	return;
	var title = title || undefined;
	
	
	$('body').append('<div class="ov-alert-wrapper"></div>');
	genratrLoad('/oddsquad/template/alert/index.html', '[data-genratr-wrapper]', '.ov-alert-wrapper')
	
	setTimeout(function () {
		$('[data-overlay]').addClass('init-overlay');
	}, 250);	
	
	
	if(type == 'award' || type == 'locker') {
		dvalue = value - 1
		
		var container 	= $('.alert-wrapper'),
			myBtn		= $(container).find('.btn-close');
					
		if(type == 'award'){
			console.log('add award!');
			$(container).find('h5').html("You've Earned A New Award!");
			//$(container).find('figure img').attr('src', site.awards[dvalue].src);
			//$(container).find('figure p').html(site.awards[dvalue].name);
			$(myBtn).find('span em').html('View All Awards');
			
			$(myBtn).attr('data-overlay-type', 'awards');
			$(myBtn).attr('data-overlay-title', 'My Awards');
			
		}else if(type == 'locker'){
			
			$(container).find('h5').html("You've Unlocked A New Door!");
			$(container).find('figure img').attr('src', site.lockers[dvalue].src);
			$(container).find('figure p').html(site.lockers[dvalue].name);
			$(myBtn).find('span em').html('View All Doors');
			
			$(myBtn).attr('data-overlay-type', 'doors');
			$(myBtn).attr('data-overlay-title', 'My Doors');
			
			
		}
		$('[data-overlay="alert"]').addClass('init-overlay');
		return;
	};
	
	$('[data-overlay="' + type + '"]').addClass('init-overlay');
		
}