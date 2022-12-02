// JavaScript Document
var genratrbuiltTot = 0,
	genratrbuildTot = 0;

function genratrGrab(container) {
	
	genratrbuildTot = $(container).find('[data-genratr]').length;
	
	$('[data-genratr]').each(function() {
		var url			= $(this).attr('data-genratr'),
			selector	= '[data-genratr-wrapper]',
			target		= this;
			
		genratrLoad(url, selector, target);
		
	});
	
};
function genratrLoad(url, selector, target) {
	/*
	console.log('BUIL-D', genratrbuildTot);
	console.log('BUIL-T', genratrbuiltTot);
	console.log('------------ 1st ------------');
	*/
	if(genratrbuildTot == 0){
		genratrbuildTot++
	};
	/*
	console.log('BUIL-D', genratrbuildTot);
	console.log('BUIL-T', genratrbuiltTot);
	console.log('------------ 2nd ------------');
	*/
	//var $eventDispatcher = $ ( {} );
	
	console.log('woooooooohoooo');
	$(target).load(url + ' ' + selector, function(response, status, xhr) {
		
		if(status == "error" ) {
			$(target).html('Could not load: ' + url + ' ' + xhr.status + " " + xhr.statusText);
			return;
		};
		
		console.log('LOAD STATUS: ', status);
			
		if(genratrbuildTot == genratrbuiltTot) {			
			genratrbuiltTot = 0;
			genratrbuildTot = 0;

			//init content functions for new loaded content
			buildContent();
		};
		
		genratrbuiltTot++
	
	/*
	console.log('BUIL-D', genratrbuildTot);
	console.log('BUIL-T', genratrbuiltTot);
	console.log('------------ 3rd ------------');
	*/
		//$eventDispatcher.trigger ( "COMPLETE" );
	});
	
	//return $eventDispatcher;
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
		//console.log('replace state fired');
		window.history.replaceState(stateObject, title, origin + url);
	} else {
		//console.log('push state fired');
		window.history.pushState(stateObject, title, origin + url);
	}
	
	//check target url for /'s and add their position into targetUrl object
	var targetUrl = [];
	for(var i=0; i < url.length; i++) {
		if (url[i] === '/' && i == 0) {
			targetUrl.push(i)
		};
	};
	
	console.log('url: ', url);
	console.log('targetUrl: ', targetUrl);
	
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
	
	$('title').load(origin + url + '/index.html' + ' ' + 'title', function(response, status, xhr) {
		if(status == "error" ) {
			$(target).html('Could not load: ' + url + ' ' + xhr.status + " " + xhr.statusText);
			return;
		} else {
			if($('title > title').exists() == true) {
				$('title > title').unwrap();
			};
		}
	});
	
	for(var i=0; i < scrollPages.length;i++) {
		if(scrollPages[i]._details.name == target[0]){
			
			if(target.length > 1) {
				if($('.ov-wrapper').exists() == false) {
					
					$('body').append('<div class="ov-wrapper" data-type="' + target[1] + '"></div>');
					var $eventDispatcher = genratrLoad('/oddsquad/' + target[0] + '/' + target[1] + '/index.html', '[data-genratr-wrapper]', '.ov-wrapper[data-type="' + target[1] + '"]');
					
				}
				
				$(document).trigger('OVERLAY_CREATED', target[1]);
				
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

/**
 * Remove active overlay and add/remove appropriate classes to containers
 */
function findIndexByProperty(array, property, value) {
	var propertyList = property.split(".");

	for (var i = 0; i < array.length; i++) {
		
		var obj = array[i];
		
		for(var j = 0; j < propertyList.length; j++) {
			obj = obj[propertyList[j]];
		}
				
		if (obj == value) {
			return i;	
		}
	}
	return -1;
}

function genratrCheckURL() {
	
	//get the search substring from the window location object
	var urlParam = location.search.substring(1) || false,
		params = [];
	
	//if search substring is empty make status fals
	if(!urlParam) {
		params.status = false;
	}else{
		//set status to true which triggers additional functions
		params.status = true;
		//remove extra content from from of string "dir=/"
		
		urlParam = urlParam.replace('dir=/','');
		
		//remove trailing "/" if one exists
		urlParam = urlParam[0] == "/" ? urlParam.substring(1, urlParam.length) : urlParam;
		
		
		urlParam = urlParam[urlParam.length - 1] == "/" ? urlParam.substring(0, urlParam.length-1) : urlParam;
		

		//split the sub directories into an array within the params.target object
		urlParam = urlParam.split('/')
		params.target = urlParam;
	}
//	return params;
console.log('params: ', params);
	testArray = [
		{"details": {"name":"frank"}},
		{"details": {"name":"steve"}},
		{"details": {"name":"bob"}}
	]
	
	console.log("INDEX: " , findIndexByProperty(testArray, "details.name", "bob"));

}

function initOverlay(title, type, value) {
	console.log('this one is firing');
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