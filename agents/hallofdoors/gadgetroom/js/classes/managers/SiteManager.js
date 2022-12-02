require.include ( "weblib/event/AbstractEventDispatcher" );

( function ( ns ) {
	"use strict"

	SiteManager.prototype = new AbstractEventDispatcher ();
	SiteManager.prototype.constructor = SiteManager;

	function SiteManager () {

		var _this = AbstractEventDispatcher.call ( this );

		var _stage,
		_sprite,
		_currentFrame,
		_numFrames,
		_data,
		_rightPressed,
		_leftPressed,
		_buttonCommandQueue;


		function _construct () {

			_currentFrame = 0;
			_rightPressed = false;
			_leftPressed = false;

			_buttonCommandQueue = new CommandQueue ( null, true );


				// setup the ticker.
			createjs.Ticker.setFPS ( 12 );
			createjs.Ticker.addEventListener ( "tick", _update );

				// set up the listeners
			CreateJSAssetManager.addEventListener ( AssetLoaderEvent.LOAD_COMPLETE, _onSpritesheetLoadComplete_listener );
		}


		function _onSpritesheetLoadComplete_listener ( event ) {

			console.log ( "_onSpritesheetLoadComplete_listener" );

			_buttonCommandQueue.cancel ();
			
			$ ( "#tile_grid_wrapper" ).attr ( "state", "closed-animating" );
			
			var topClosed = $ ( "#tile_grid_wrapper" ).height () + 18;
			var commandSet = new CommandSet ();
			commandSet.tweenTo ( $ ( "#tile_grid_wrapper" ), 0.5, { "top" : -topClosed });
			commandSet.apply ( $ ( "#tile_grid_wrapper" ).attr, [ "state", "closed" ], $ ( "#tile_grid_wrapper" ) );
			commandSet.apply ( $ ( "#tile_grid_wrapper" ).removeClass, [ "open" ], $ ( "#tile_grid_wrapper" ) );
			commandSet.apply ( $ ( "#tile_grid_wrapper" ).addClass, [ "closed" ], $ ( "#tile_grid_wrapper" ) );
			_buttonCommandQueue.queue ( commandSet );


			$ ( "header h3 span" ).text ( TextRandomizer.getId ( 2 ) + "-" + TextRandomizer.randomNumber ( 99, 2 ) + " v." + TextRandomizer.randomNumber ( 9, 0 ) );

			$ ( "#invention_id" ).text ( TextRandomizer.randomNumber ( 99, 2 ) );

			$ ( "#invention_code" ).text ( TextRandomizer.randomNumber ( 999, 3 ) + "-" + TextRandomizer.randomNumber ( 999, 3 ) + " " + TextRandomizer.chooseRandomWord () );

			$ ( "#measurements li " ).each ( function ( e ) {
				$ ( this ).find ( "span" ).text ( TextRandomizer.randomNumber ( 99, 2 ) + " Inches" );
			} );

			$ ( "#tile_grid_wrapper" ).fadeIn ();

			$ ( window ).resize ();

			ns.GadgetManager.fadeOutItem ();

			var spriteSheet = CreateJSAssetManager.getSpriteSheet( _data.spritesheet );
			_sprite = new createjs.Sprite(spriteSheet, "rotate");
			_sprite.gotoAndStop ( _currentFrame );
			_numFrames = spriteSheet._frames.length;

				// change the title
			$ ( "header h1" ).text ( _data.title );

			$ ( "#information_bottom_left" ).html ( _data.information );

			$ ( "#information_bottom_left" ).html ( _data.information );

			_clearFile ();

			_stage.addChild ( _sprite );
		}

		/**
		 * Tick listener, handles left and right rotation and updating the stage.
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		function _update () {
			if(_rightPressed) {
				// if the right button is pressed, rotate to the right:
				// increase the current frame by one and set the sprite's frame to that.
				_currentFrame = (_currentFrame + 1) % _numFrames;
				_sprite.gotoAndStop(_currentFrame);
			}
			if(_leftPressed) {
				// if the left button is pressed, rotate to the left.
				// decrease the current frame by one, and set the sprite's frame to that.
				_currentFrame = _currentFrame - 1;
				if(_currentFrame < 0) {
					_currentFrame = _currentFrame + _numFrames;
				}
				_sprite.gotoAndStop ( _currentFrame );
			}


			var halfNodeWidth = 16 * 0.5;
			var halfNodeWidth = 14 * 0.5;

				// fix the line from one 
			for ( var i = 0; i < $ ( ".chart-node" ).length - 1; i++ ) {

				var $node = $ ( ".chart-node:eq(" + i + ")" );
				var nodeOffset = $node.offset ();
				var nodeNextOffset = $ ( ".chart-node:eq(" + ( i + 1 ) + ")" ).offset ();
				var xDifference = nodeNextOffset.left - nodeOffset.left;
				var yDifference = nodeNextOffset.top - nodeOffset.top;

				var rotation = Math.atan2 ( yDifference, xDifference ) / Math.PI * 180;

				var x_squared = Math.abs ( xDifference );
				x_squared *= x_squared;
				var y_squared = Math.abs ( yDifference );
				y_squared *= y_squared;
				var distance = Math.round ( Math.sqrt ( x_squared + y_squared ) );
				
				$node.find ( ".chart-line" ).css ( { "width" : distance } );
				$node.find ( ".chart-line" ).css ( {
					'-webkit-transform': 'rotate(' + rotation + 'deg)',
					'-moz-transform': 'rotate(' + rotation + 'deg)',
					'-ms-transform': 'rotate(' + rotation + 'deg)',
					'-o-transform': 'rotate(' + rotation + 'deg)',
					'transform': 'rotate(' + rotation + 'deg)' } );
			}

			_stage.update ();
		}

		function _clearFile () {
			_stage.removeAllChildren ();
		}

		/**
		 * Initializes the rotator, creating the stage, loading the first file,
		 * adding a tick listener, and adding listeners to all the input controls.
		 * @return {[type]} [description]
		 */
		_this.init = function () {
				// setup the stage.
			_stage = new createjs.Stage ( "gadgetCanvas" );

				// setup the listeners for the right button
			$ ( "#right" ).mousedown ( function () { _rightPressed = true; } );
			$ ( "#gadget-wrapper" ).mouseup ( function () { rightPressed = false; } );
			$ ( "#right" ).mouseout ( function () { _rightPressed = false; } );

				// setup the listeners for the left button.
			$ ( "#left" ).mousedown ( function () { _leftPressed = true; } );
			$ ( "#gadget-wrapper" ).mouseup ( function () { _leftPressed = false; } );
			$ ( "#left" ).mouseout ( function () { _leftPressed = false; } );

				// text scrollers
			if ( !$ ( "body" ).hasClass ( "mobile" ) ) {



				new ss.RandomTextScroller ( $ ( "#scroll_text_1" ), randomLines, 10, 200 );
				new ss.RandomTextScroller ( $ ( "#scroll_text_2" ), randomLines, 14, 100 );
				new ss.RandomTextScroller ( $ ( "#scroll_text_3" ), randomLines, 7, 200 );


					// animate the background diagram
				TweenMax.to ( $ ( "#diagram_faded" ), 2, { "opacity" : 0.25, "yoyo" : true, "repeat" : -1 } );

					// animate the chart nodes
				for ( var i = 0; i < $ ( ".chart-node" ).length; i++ ) {
					TweenMax.to ( $ ( ".chart-node" ).get ( i ), 2.5 + Math.random () * 2.5, { "top" : 148 - ( 20 * i ), "yoyo" : true, "repeat" : -1 } );
				}

				for ( var i = 1; i < 8; i++ ) {
					TweenMax.to ( $ ( "#information_grid li:nth-child(" + i + ") div" ), 1.5 + Math.random () * 1.5, { "delay" : Math.random () * 2, "height" : 188 - ( 20 * i ), "yoyo" : true, "repeat" : -1 } );
				}

			}

			var topClosed = $ ( "#tile_grid_wrapper" ).height () + 18;
			$ ( "#tile_grid_wrapper" ).css ( { "top" : -topClosed } );

			$ ( "#button_wrapper" ).click ( function ( e ) {

				console.log ( );

				_buttonCommandQueue.cancel ();

				var topClosed = $ ( "#tile_grid_wrapper" ).height () + 18;
				var commandSet = new CommandSet ();

				switch ( $ ( "#tile_grid_wrapper" ).attr ( "state" ) ) {
					case "open" :
					case "open-animating" :
						$ ( "#tile_grid_wrapper" ).attr ( "state", "closed-animating" )
						commandSet.tweenTo ( $ ( "#tile_grid_wrapper" ), 0.5, { "top" : -topClosed });
						commandSet.apply ( $ ( "#tile_grid_wrapper" ).attr, [ "state", "closed" ], $ ( "#tile_grid_wrapper" ) );
						commandSet.apply ( $ ( "#tile_grid_wrapper" ).removeClass, [ "open" ], $ ( "#tile_grid_wrapper" ) );
						commandSet.apply ( $ ( "#tile_grid_wrapper" ).addClass, [ "closed" ], $ ( "#tile_grid_wrapper" ) );
						_buttonCommandQueue.queue ( commandSet );
						break;
					default :
					case "closed-animating" :
					case "closed" :
						$ ( "#tile_grid_wrapper" ).attr ( "state", "open-animating" )
						commandSet.tweenTo ( $ ( "#tile_grid_wrapper" ), 0.5, { "top" : 0 });
						commandSet.apply ( $ ( "#tile_grid_wrapper" ).attr, [ "state", "open" ], $ ( "#tile_grid_wrapper" ) );
						commandSet.apply ( $ ( "#tile_grid_wrapper" ).removeClass, [ "closed" ], $ ( "#tile_grid_wrapper" ) );
						commandSet.apply ( $ ( "#tile_grid_wrapper" ).addClass, [ "open" ], $ ( "#tile_grid_wrapper" ) );
						_buttonCommandQueue.queue ( commandSet );
						break;
				}
			} );


				// load up the icons
			ss.GadgetManager.load ( DATA );
		}

		/* Load a given file.
 		* @param  {string} fileName The name of the file to load, without an extension. For example "gridinator"
  		*/
		_this.load = function ( data ) {

				// clear all the active classes from the tile grid
			$ ( "#tile_grid li" ).removeClass ( "active" );

			var $element = ( data.$element ).addClass ( "active" );

			_data = data;
			
			CreateJSAssetManager.load ( { "assets" : [ { "id" : data.spritesheet, "src" : data.spritesheet } ] } );

		}

		_this.resize = function () {

			var topClosed = $ ( "#tile_grid_wrapper" ).height () + 18;

			switch ( $ ( "#tile_grid_wrapper" ).attr ( "state" ) ) {
				case "open" :
					$ ( "#tile_grid_wrapper" ).css ( { "top" : 0 } );
					break;
				case "open-animating" :
					TweenMax.to ( $ ( "#tile_grid_wrapper" ), 0.5, { "top" : 0 });
					break;
				case "closed-animating" :
					TweenMax.to ( $ ( "#tile_grid_wrapper" ), 0.5, { "top" : -topClosed });
					break;
				case "closed" :
				default :
					$ ( "#tile_grid_wrapper" ).css ( { "top" : -topClosed } );
					break;
			}
			
			
			if ( !isMobile.any () ) {
				var scale = Math.min ( 1, $ ( window ).width () / 825 );
				var transform = "scale(" + scale + ")";
    			$ ( "header" ).css ( "MozTransform", transform + " translate(-50%,0)" ).css ( "transform", transform ).css ( "WebkitTransform", transform  ).css ( "msTransform", transform );
    			$ ( "#gadget-wrapper" ).css ( "MozTransform", transform + " translate(-50%,0)" ).css ( "transform", transform + " translate(-50%,0)" ).css ( "WebkitTransform", transform + " translate(-50%,0)" ).css ( "msTransform", transform + " translate(-50%,0)" );
			}
			
		}

		return _construct ();
	}


	var TextRandomizer = new function () {

		var _this = this;

		_this.getId = function ( length ) {
			var text = "";
    		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    	for ( var i=0; i < length; i++ ) {
	        	text += possible.charAt ( Math.floor ( Math.random () * possible.length ) );
	    	}

	    	return text;
		}

		function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}

		_this.randomNumber = function ( number, padding ) {
			return pad ( Math.round ( Math.random () * number ), padding );
		}

		_this.chooseRandomWord = function () {
			return [ "Banana", "apple", "orange" ] [ Math.round ( Math.random () * 2 ) ];
		}

		return _this;
	}

	ns.SiteManager = ns.SiteManager || new SiteManager ();

} ( ss ) )