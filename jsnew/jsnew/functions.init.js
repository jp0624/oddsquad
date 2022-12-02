

// =======================================================
//                GLOBAL DOCUMENT LISTENERS
// -------------------------------------------------------


window.addEventListener('load',function load() {
	window.removeEventListener('load', load, false);
	document.body.classList.remove('load');
},false);

//page and window specific listeners
$(document).ready(globalInstance.documentReady());
$(document).ready( function() {
		
	//set the load page to the home directory and give it a push state
	
	if($('.page-home').index() > 0) {
	};

		genratrGrab('body');
	//check if url has params and turn into pushstate/clean urls
	
	if(params.target) {
		initPageLoad(0);
		
		
		$(document).on('GENERATR_COMPLETE', function(){
			
			
			// if home page use this method to initiate history push/replaceState		
			genratrSetURL('/' + params.target[0] + '/', true);
			
			// load the page title from the url provided and replace active page title
			genratrSetTitle('/' + params.target[0] + '/');
			
			// change the page based on the url change
			changePage(params.target);
			
			if(params.length == 1){
				hideOverlay();
			};
		});
		
		
	} else {
		if(location.pathname == '/home/'){
			genratrSetURL('/home/');
		};
	};
	// Change faux url on click 
	window.onpopstate = function(event) {
		console.trace('popstate trace')
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

// page loading event listener used to stop css animations pre-page load
window.addEventListener('load', function load(){
	// remove event listener once used
	window.removeEventListener('load', load, false);
	
	// remove load class on body
	document.body.classList.remove('load');
}, false);

$(document).on('click', '[data-genratrTarget]', function(event) {
	console.error('event(init-125: ', event)
	event.preventDefault();
	
	if(playerLoaded == true) {
		player.pause();
	};
	
	var url				= $(this).attr('href'),
		title			= 'Odd Squad - ' + url,
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