
var site = [],
	player, 
	playlist,
	playlistsLoaded = false,
	firstPlaylistId = '2';


$(document).ready(function () {
});
	
function scrollVert(container, direction) {
	container.animate({
		scrollTop : container.scrollTop() + (container.height() * 0.8 * direction)
		}, 250);
}

function scrollHoriz(container, direction) {
	console.log(container);
	console.log(direction);
	container.animate({
		scrollLeft : container.scrollLeft() + (container.width() * 0.8 * direction)
		}, 250);
}

function initVideoPlayer(){ 	
	$('.scrollPlaylist_up').click(function(evt) {
		scrollVert($("#pl-nowPlaying"), -1);
	});

	$('.scrollPlaylist_down').click(function(evt) {
		scrollVert($("#pl-nowPlaying"), 1);
	});
				
	$('.thumb-container').click(function(e) {
		videoSelected(e.currentTarget);
	});
	
	$('.browsePlaylistsBtn').click(function() {
		$('#browserWrapper').addClass('display');		
		player.pause();
	});
	
	$('.browsePlaylistsCloseBtn').click(function() {
		$('#browserWrapper').removeClass('display');
	});
	
	player = new org.pbskids.video.Player("player", {
		onPlayerComplete	: onPlayerComplete,
		onVideoClick		: "toggle-pause",
		scrubber			: "#controlRack .scrubber",
		pauseToggleControl	: "#controlRack .playPause",
		timerCurrent		: "#controlRack .timeCurrent",
		captionsToggleControl	: "#controlRack .closedCaptions",
		debugMode			: true,
		loadingOverlay		: {
			url:"http://www-tc.pbskids.org/pbsk/video/img/arrowspin.gif",
			swf:"http://www-tc.pbskids.org/pbsk/video/swf/arrowspin.swf",
			width:"50px",
			height:"50px"
		}
	});
};
	
	

function onPlayerComplete(e){
	if( e.success ){
		console.log("Player was successfully built");
		playerLoaded = true;
			
			$('.videoPlayer-wrapper').removeClass('geoError');
			$('.videoPlayer-wrapper').addClass('geoGood');
			
		getPlaylist();
	} else {
		alert("Whoops! Something went wrong building the player: " + e.message);
	}
};

function getPlaylist() {
	
	$.getJSON('/oddsquad/json/playlists.json', function(data) {
		console.log('playlists JSON GET STARTED');
		site.playlists = data.playlists;
	})
	.success( function() {
		console.log('playlists JSON GET SUCCESS');
	})
	.error( function(jqXHR, textStatus, errorThrown) {
		console.log('getJSON error: ', textStatus);
		console.log('getJSON errorThrown: ', errorThrown);
		console.log('arguments: ', arguments);
		console.log("getJSON incoming Text " + jqXHR.responseText);
	})
	.complete( function() {
		console.log('playlists JSON GET COMPLETE');
		
		buildPlaylists();
		
		initFirstPlaylist(player);
	});
};

function buildPlaylists() {
	
	var container			= $('.plContainer'),
		itemContainerWidth	= ($(container).width() / 100) * 80,
		itemWidth			= Math.ceil(itemContainerWidth / 3.5),
		plTot 				= site.playlists.length;
	
	console.log(itemWidth);
	
	for (var i = 0; i < plTot; i++) {
		
		/*
			desc: "Description to be placed here."
			id: "1"
			keywords: "OSTest"
			name: "newest"
			src: "images/playlists/door-01.png"
			theme: "purple"
			
		*/
		
		$(container).append('<div class="plWrapper plWrapper-' + i + ' plTheme-' + site.playlists[i].theme + '" data-plId="' + i + '"><div class="playlistTitleTile"><span>' + site.playlists[i].name + '</span></div><a href="#" data-plControl="' + i + '" data-plControlDir="prev" class="btn-vid btn-vid-prev"><i></i></a><a href="#" data-plControl="' + i + '" data-plControlDir="next" class="btn-vid btn-vid-next"><i></i></a><ul id="pl-' + i + '" class="pl-generic"><li class="plItem" style="width: ' + itemWidth + 'px"></li></ul></div>');
		$('#pl-' + i + ' .plItem').append('<div class="sizer"></div><div class="sized"><div class="thumb-container"><img class="googlethumbnail" src=""/><span class="fullep-label"><span class="full-label">Full </span>Episode</span><span class="new-label">New</span></div><div class="video-info"><span class="video-title"></span><span class="video-duration"></span><span class="video-expiration"></span></div></div>');
		
	};
	
	loadPlaylists();
	
}

function initFirstPlaylist(playerInstance){
	
	console.log('LOAD THIS PLAYLIST: ', firstPlaylistId);
	
	firstPlaylist = new org.pbskids.video.PlayList(
		"pl-nowPlaying",
		"plItem",
		player,
			{
				//this stops the clip from playing when loaded
				autoPlay				: true,
				loadingIndicator		: "http://www-tc.pbskids.org/video/img/arrowspin.gif"
			}
	);
	
	for (var i = 0; i < site.playlists.length; i++) {
		
		console.log('scanning: ', i);
			
		if(site.playlists[i].id == firstPlaylistId){
			console.log('this one: ', i);
			
			firstPlaylist.refresh({
				keyword :  site.playlists[i].keywords
			});
			
		};
		
	};
	
}
	
function loadPlaylists(){

	if (playlistsLoaded) {
		return;
	}

	var plTot = site.playlists.length;
	console.log("There are " + plTot + " playlists");

	var playlist;
	
	for (var i = 0; i < plTot; i++) {
		
		playlist = new org.pbskids.video.PlayList(
			'pl-' + (i),
			'plItem',
			player,
				{
					autoPlay			: false,
					loadingIndicator	: "http://www-tc.pbskids.org/video/img/arrowspin.gif",
					iScrollOpts			: {hScroll:true, vScroll:false, handleClick: true, wheelAction: 'scroll', hScrollbar: true}
				}
		);
		console.log('playlist: ', playlist);
		
		// this is where we can call from a json doc to source keywords, etc...
		
		playlist.refresh( {
				keyword :  site.playlists[i].keywords
			}
		);
		
		console.log('keywords: ', '"' + site.playlists[i].keywords + '"');
			
		//all playlists are loaded, time to fire a trigger
		if(i == plTot -1) {
			
			playlistsLoaded = true;
			$(document).trigger( "PLAYLISTS_LOADED" );
			
			console.log('playlists loaded!');
			setTimeout( function() {
				sizePlaylists();
				
				//$('#browserWrapper .pl-generic .plItem').on('click', function(){
				$('#browserWrapper .pl-generic .plItem').click(function() {
					console.log('ITEM FROM CAROUSEL CLICKED');
					$('#browserWrapper').removeClass('display');
					
					firstPlaylistId = $(this).closest('.plWrapper').attr('data-plId')
					
					firstPlaylist.refresh({
						keyword :  site.playlists[firstPlaylistId].keywords
					});
				});
				
				
					
				$('[data-plcontroldir="prev"]').click(function(evt) {
					var plId = $(this).attr('data-plcontrol');
					scrollHoriz($('ul[id="pl-' + plId + '"').closest('.iScrollContainer'), -1);
				});
				
				$('[data-plcontroldir="next"]').click(function(evt) {
					var plId = $(this).attr('data-plcontrol');
					//console.log('NEXT PRESSED: ', plId);
					
					scrollHoriz($('ul[id="pl-' + plId + '"').closest('.iScrollContainer'), 1);
					
				});
				
				
				
			}, 1000);
			
		};

	};
	
};
	
function sizePlaylists(){
	
	$('.pl-generic').each( function() {
		var	items		= $(this).find('.plItem').length,
			parent		= $(this).closest('.iScrollContainer');
		
		var	parentW		= $(parent).innerWidth();
		
		$(this).find('.plItem').width(100 / items + '%');
		$(this).width(22.2 * items + '%');
		
		
		console.log('items: ', items);
		
		//$(this).find('.pl-generic').width(items * itemWidth + 'px');
		
		probePlCarousel($(this).closest('.plWrapper'));
		
		//$(this).prepend('<div>'+ items +'</div>');
		
	});
	
	
	$('[data-plcontrol]').on('click', function() {	
		var parent 			= $(this).parent('.plWrapper'),
			carousel		= $(parent).find('.pl-generic'),
			carouselPosi	= $(carousel).position(),
			itemWidth		= $(carousel).find('.plItem').outerWidth(),
			items			= $(carousel).find('.plItem').length;
		
		if($(this).attr('data-plcontroldir') == 'next' && (carouselPosi.left * -1) < (items-1) * itemWidth) {
			$(carousel).css('webkit-transform', 'translate(' + carouselPosi.left - itemWidth + 'px, 0px)');
		}
		
		//delta =	$(this).attr() == 6 ? '2D' : elemMatrix[1].length == 17 ? '3D' : undefined,
		
	});
	
}
function probePlCarousel(elem){
	var container		= $(elem).find('.iScrollContainer'),
		carousel		= $(container).find('.pl-generic'),
		carouselPosi	= $(container).find('.pl-generic').position(),
		itemWidth		= $(carousel).find('.plItem').outerWidth(),
		items			= $(carousel).find('.plItem').length;
		
		console.log('carouselPosi: ', carouselPosi);
	
	/*	
	if (carouselPosi.left == 0) {
		$(elem).addClass('start');
		//return 'start';
	} else {
		$(elem).removeClass('start');
		
	}
	if (carouselPosi.left == (items-3.5) * itemWidth ) {
		$(elem).addClass('end');
		//return 'end';
	} else {
		$(elem).removeClass('end');
		
	}
	*/
	if (items * itemWidth < $(container).innerWidth() ) {
		$(elem).addClass('end start');
		
	}

}
$(function(){
	videoJSLoaded = true;
	$ ( document ).trigger ( "VIDEOJS_LOADED" );
});