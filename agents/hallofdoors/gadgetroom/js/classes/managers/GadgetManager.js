require.include ( "core" );

( function ( ns ) {
	
	GadgetManager.prototype = new AbstractEventDispatcher ();
	GadgetManager.prototype.constructor = GadgetManager;

	function GadgetManager () {

		var _super = {};
		var _this = AbstractEventDispatcher.call ( this );

		function _construct () {

		}

		function _addIcon ( item ) {

			var $item = $ ( "<li><img src='{icon}' /></li>".replace ( "{icon}", "images/icons/" + item.icon ) );
			
				// save a reference to the current item
			item.$element = $item;
			console.log ( item );

			$item.data ( "data", item );

			$item.click ( function ( e ) {
				ns.SiteManager.load ( $ ( this ).data ( "data" ) );
			} );

			$ ( "ul#tile_grid" ).append ( $item );
		}

		_this.load = function ( data ) {

			var iterator = new Iterator ( DATA );

			while ( iterator.hasNext () ) {
				var item = iterator.next ();

				_addIcon ( item );
			}
		}

		_this.fadeOutItem = function ( e ) {
			
		}

		return _construct ();
	}

	ns.GadgetManager = ns.GadgetManager || new GadgetManager ();

} ( ss ) );