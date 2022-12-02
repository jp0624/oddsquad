// JavaScript Document
var genratrbuiltTot = 0,
	genratrbuildTot = 0;

function genratrGrab(container) {
	
	genratrbuildTot = $(container).find('[data-genratr]').length;
	
	console.log('GENERATOR BUILD TOTAL: ', genratrbuildTot);
	
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
	
	console.log('GENERATOR LOAD CONTENT FUNCTION INITIATED');
	$(target).load(url + ' ' + selector, function(response, status, xhr) {
		
		console.log('GENERATOR LOAD CONTENT FUNCTION STARTED', url);
		if(status == "error" ) {
			$(target).html('Could not load: ' + url + ' ' + xhr.status + " " + xhr.statusText);
			return;
		};
		
		if(genratrbuildTot == genratrbuiltTot) {
			genratrbuiltTot = 0;
			genratrbuildTot = 0;

			//init content functions for new loaded content
			buildContent();
		};
		
		genratrbuiltTot++		
		console.log('genratrbuildTot builD: ', genratrbuildTot);
		console.log('genratrbuiltTot builT: ', genratrbuiltTot);
		
		$eventDispatcher.trigger ( "COMPLETE" );
	});
	console.log('GENERATOR LOAD CONTENT FUNCTION: ', url + ' ' + selector + ' ' + target);
	return $eventDispatcher;
}

function genratrSetURL(url, title, _replace) {
	console.log('genratrSetURL STARTED');
	var location 	= window.history.location || window.location,
		stateObject = {};
	
	console.log('WINDOW LOCATION: ', location);
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
	console.log('URL TO PUSH: ', url);
	for(var i=0; i < url.length; i++) {
		if (url[i] === '/') {
			targetUrl.push(i)
		};
	};
	console.log('targetUrl: ', targetUrl);
	//if /'s are at front and/or end remove to clean up array
	var target = url.indexOf('/') == 0 && url[(url.length-1)] == '/' ? url.substring(1, url.length-1) : url.indexOf('/') == 0 ? url.substring(1) : url[(url.length-1)] == '/' ? url.substring(0, url.length-1) : url;
	var target = target.split('/');
	
	console.log('target: ', target);
	
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
		//cycle all page/slide names until match is found with target[0]
		if(scrollPages[i]._details.name == target[0]){
			
			//if target has a subpage then create overlay
			if(target.length > 1) {
				$('body').append('<div class="ov-wrapper" data-type="' + target[1] + '"></div>');
				var $eventDispatcher = genratrLoad('/oddsquad/' + target[0] + '/' + target[1] + '/index.html', '[data-genratr-wrapper]', '.ov-wrapper[data-type="' + target[1] + '"]')
				
				$eventDispatcher.on ( { "COMPLETE" : function ( event ) {

					console.log('OVERLAY CREATED TRIGGER');
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