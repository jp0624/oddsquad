var paramsExist = false

// =======================================================
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------

window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	$(document).find('body').removeClass('load');
},false);

//page and window specific listeners
$(document).ready(globalInstance.documentReady());
$(document).ready( function() {
		
	//set the load page to the home directory and give it a push state
	
	$(document).on('GENERATR_COMPLETE', function(){

		console.log('+++++++++++++++++++++++++++++ GENERATR_COMPLETE FIRED');
		if(generatrComplete && paramsExist){
			updatePageParams();
		}

	});
	$(document).on('PARAMS_EXIST', function(){

		console.log('+++++++++++++++++++++++++++++ PARAMS_EXIST FIRED');
		if(generatrComplete && paramsExist){
			updatePageParams();
		}

	});

	
	if($('.page-home').index() > 0) {
	};

		genratrGrab('body');
	//check if url has params and turn into pushstate/clean urls
	
	console.log('Params: ', params);
	if(params.target) {
		initPageLoad(0);

		paramsExist = true;
		$(document).trigger('PARAMS_EXIST');
		
		
	} else {
		if(location.pathname == '/home/'){
			genratrSetURL('/home/');
		};
	};
	// Change faux url on click 
	window.onpopstate = function(event) {
		console.log('popstate trace')
		console.log("location Pathname: ", document.location.pathname);
		console.log('event: ', event);

		var url	= JSON.stringify(event.state);

			url	= url.replace(/['"]+/g,'');
			
			target = [];
			target = cleanPath(url);
			targetObj = target.split('/')
			
			console.log('TARGET: ', target);
			console.log('SPLIT URL TO TARGET: ', targetObj);
			console.log('TARGET LENGTH: ', targetObj.length);			
			console.log('NEW URL: ', url);
			
			
		if(!url || url == 'null' || url == null){
			return;
		} else {
			
			if(targetObj.length == 1){
				console.log('hit here 1');
				url = url.replace(/[^A-Z0-9]/ig, "");
				changePage(cleanPath(url));
				hideOverlay();
			} else {
				console.log('hit here 2');
				//init overlay in here
				changePage(url);
				
			};
			
		}
	};
	
});
$(window).resize(globalInstance.documentResize());

$(document).on('click', '[data-genratrTarget]', function(event) {
	console.log('event(init-125: ', event);

	event.preventDefault();
	
	if(playerLoaded == true) {
		player.pause();
	};
	
	var url			= $(this).attr('href');

	var sliceStart	= 0,
		sliceEnd	= url.length;

	if(url[0] == '/'){
		sliceStart = 1;
	}
	if(url[sliceEnd - 1] == '/'){
		sliceEnd = url.length - 1
	}

	var sliceUrl	= url.slice(sliceStart, sliceEnd);

	var splitUrl	= sliceUrl.split('/');

	if(splitUrl[0] == 'oddsquad'){
		//splitUrl = splitUrl.pop();
		splitUrl.splice(0, 1);


		var newUrl = joinArray(splitUrl, '/');

		url = '/' + newUrl + '/';

	} else {
		var newUrl = url;
	}


	var	title			= 'Odd Squad - ' + url,
		doneFunction	= getFunctionForString($(this).attr('data-genratr-doneFunc')),
		specFunction	= getFunctionForString($(this).attr('data-genratr-specFunc'));

	console.log('url: ', url);
	console.log('title: ', title);
	console.log('doneFunction: ', doneFunction);
	console.log('specFunction: ', specFunction);
	
	if(specFunction){
		specFunction();
	};
	
	pushUrl(this, url, title, doneFunction);
	
});

function joinArray(urlArray, div){
	var newArray = '';

	for(i=0; i < urlArray.length; i++){
		newArray += urlArray[i];

		if(i < urlArray.length - 1){
			newArray += div;
		}
	}
	return newArray;
}
function updatePageParams(){

	console.log('+++++++++++++++++++++++++++++ updatePageParams FIRED');
	// if home page use this method to initiate history push/replaceState		
	genratrSetURL('/' + params.target[0] + '/', true);
	
	// load the page title from the url provided and replace active page title
	genratrSetTitle('/' + params.target[0] + '/');
	
	// change the page based on the url change
	changePage(params.target);
	
	if(params.length == 1){
		hideOverlay();
	}

}