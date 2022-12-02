
	var player, 
	    playlist,
	    playlistsLoaded = false;
 
	function initVideoPlayer(){ 

		$('.browsePlaylistsBtn').click(function() {
					$('#browserWrapper').addClass('display');
					loadPlaylists();
				});

		$('.browsePlaylistsCloseBtn').click(function() {
					$('#browserWrapper').removeClass('display');
				});

		$('.scrollPlaylist_up').click(function(evt) {
					scrollVert($("#nowPlayingList"), -1);
				});

		$('.scrollPlaylist_down').click(function(evt) {
					scrollVert($("#nowPlayingList"), 1);
				});

		$('.scrollPlaylist_left').click(function(evt) {
					scrollHoriz($(evt.currentTarget.parentNode.id.replace('browserP', '#p')), -1);
				});

		$('.scrollPlaylist_right').click(function(evt) {
					scrollHoriz($(evt.currentTarget.parentNode.id.replace('browserP', '#p')), 1);
				});

		$('.thumb-container').click(function(evt) {
					videoSelected(evt.currentTarget);
				});
		// return;


		$("#controlRack .enterFullScreen").hide();

		player = new org.pbskids.video.Player( "pbs-video-player",
			{
				onPlayerComplete	: onPlayerComplete,
				onVideoClick		: "toggle-pause",
				scrubber		: "#controlRack .scrubber",
				pauseToggleControl	: "#controlRack .playPause",
				timerCurrent		: "#controlRack .timeCurrent",
			});
			
		$('.enterFullScreen').on('click', function() {
			console.log('fire full screen');	
		});
	}
 

	function onPlayerComplete(e){
		if( e.success ){
			console.log("Player was successfully built");

			$("#controlRack .volumeMute").click(function()
				{    player.enterFullscreen();
				});

			if (!player.isFlashPlayer()) {	
				$("#controlRack .enterFullscreen").show();
			}

			initPlaylist(e.player);

		}else {
			alert("Whoops! Something went wrong building the player: " + e.message);
		}
	}



	function initPlaylist(playerInstance){

		playlist = new org.pbskids.video.PlayList(
			"nowPlayingList",
			"playlistItem",
			player,
			{
				loadingIndicator	: "http://www-tc.pbskids.org/video/img/arrowspin.gif",
				previousVideoControl	: "#controlRack .prevVideo",
				nextVideoControl	: "#controlRack .nextVideo",
			}
			);

		playlist.refresh();

		$("#playlistWrapper").show();
				$('.videoPlaylist-wrapper').height($('.videoPlayer-wrapper').height());
	}


	function loadPlaylists(){
	
		if (playlistsLoaded)
		{	return;
		}

		var numPlaylists = $('.browserPlaylist').length;
		console.log("There are " + numPlaylists + " playlists");

		var list;
		for (var i = 0; i < numPlaylists; i++)
		{
			list = new org.pbskids.video.PlayList(
				"playlist_"+(i+1),
				"playlistItem",
				player,
				{
					loadingIndicator	: "http://www-tc.pbskids.org/video/img/arrowspin.gif",
				}
				);
			list.refresh();
		}

		playlistsLoaded = true;
			
	}


	function scrollVert(container, direction)
	{
		container.animate({
			scrollTop : container.scrollTop() + (container.height() * 0.8 * direction)
			}, 250);
	}

	function scrollHoriz(container, direction)
	{
		container.animate({
			scrollLeft : container.scrollLeft() + (container.width() * 0.8 * direction)
			}, 250);
	}


	function videoSelected(videoThumb)
	{
		$('.thumb-container .video-info').hide();
		$(videoThumb).find('.video-info').show();

		$('#browserWrapper').hide();
	}
	
$(function(){
	videoJSLoaded = true;
	$ ( document ).trigger ( "VIDEOJS_LOADED" );
});