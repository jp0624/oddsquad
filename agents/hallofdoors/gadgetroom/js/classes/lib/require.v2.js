( function () {

	/*******************************
	*
	********************************/

	/***************************** Static Functions ******************************/

	function isUndefined ( value ) {
		"use strict";
		return ( typeof ( value ) === String ( undefined ) );
	}

	function isEmpty ( value ) {
		"use strict"; 
		return ( typeof ( value ) === String ( undefined ) || value === null );
	}

	function setDefault ( value, defaultVal ) {
		"use strict";
		return ( isUndefined ( value ) ) ? defaultVal : value;
	}

	function isNumber ( value ) {
		return !isNaN ( parseFloat ( value ) ) && isFinite ( value );
	}

	function findBaseName ( url ) {
	    var fileName = url.substring ( url.lastIndexOf ( '/' ) + 1 );
	    var dot = fileName.lastIndexOf ( '.' );
	    return dot == -1 ? fileName : fileName.substring ( 0, dot );
	}


	function BaseEvent ( type, data ) {
		"use strict";

			// private functions
		var _this = this;
		var _type;
		
		function _construct ( type, data ) {
			_type = type;
			
			_this.data = data;
		}

		_this.toString = function () {
			return _type;
		}
		
		return _construct ( type, data );
	} 

	function AbstractEventDispatcher ( reference ) {

		var _this = reference || this;
		var _listenerMap;

		function _construct () {
			_listenerMap = {};

			return _this;
		}

		_this.indexOfListener = function ( listener, context, listenerSet ) {
			
			for ( var i = 0; i < listenerSet.length; i++ ) 
				if ( listener === listenerSet [ i ].listener && context === listenerSet [ i ].context ) 
					return i;


			return -1;
		}

		_this.addEventListener = function ( event, listener, context ) {
			
			if ( !_this.hasEventListener ( event.toUpperCase (), listener, context ) ) {
	            try {
	                var listenerSet = _listenerMap [ event.toUpperCase () ];
	                listenerSet.push ( { listener : listener, context : context } );
	            } catch ( error ) {
	                _listenerMap [ event.toUpperCase () ] = [ { listener : listener, context : context } ];
	            }
			}
		}

		_this.removeEventListener = function ( event, listener, context ) {
			var listenerSet = _listenerMap [ event.toUpperCase () ];
			if ( listenerSet ) {
				var indexOf = _this.indexOfListener ( listener, context, listenerSet );
				if ( indexOf > -1 ) {
					listenerSet.splice ( indexOf, 1 );
				}
			}
		}

		_this.hasEventListener = function ( event, listener, context ) {

				// check if the
			var listenerSet = _listenerMap [ event.toUpperCase () ];
			if ( listenerSet ) {
				if ( _this.indexOfListener ( listener, context, listenerSet ) > -1 ) {
					return true;
				}
			}

			return false;
		}

		_this.dispatchEvent = function ( event, data ) {
			var listenerSet = _listenerMap [ String ( event ).toUpperCase () ];

			if ( listenerSet ) {
				for ( var i = 0; i < listenerSet.length; i++ ) {
				
						// maintains backwards compadiblity
					if ( typeof ( event ) == "string" ) {
	                	listenerSet [ i ].listener.apply ( listenerSet [ i ].context, [ _this, data ] );
	                } else {
	                		// assign the target and pass the event through instead
	                	if ( event.target instanceof Array ) {
	                		event.target.push ( _this );
	                	} else {
	                		event.target = [ _this ];
	                	} 
	                	listenerSet [ i ].listener.apply ( listenerSet [ i ].context, [ event ] );
	                }
	                
				}
			}
		}
		
		_this.release = function () {
			for ( var property in _listenerMap )
				delete _listenerMap [ property ];
					
		}

	    return _construct ( reference );
	}


		/*******************************
		*
		********************************/
	FileInclude.prototype = new AbstractEventDispatcher ();
	FileInclude.prototype.constructor = FileInclude;

	function FileInclude ( script ) {

		var _super = {};
		var _this = AbstractEventDispatcher.call ( this );
		var _request;
		var _script;
		var _response;
		var _dependencies;

		function _construct ( script ) {
			
			_script = script;
			_dependencies = [];
			_request = new XMLHttpRequest ();
			_request.onreadystatechange = function () {

					// double check it's loaded
				if ( _request.readyState == 4 && _request.status === 200 ) {
					_onreadystatechange ();
				}
			};

			return _this;
		}

		function _onreadystatechange () {

				// set the new response text
			_response = _request.responseText;

				// clear the reference
			_this.dispatchEvent ( new BaseEvent ( "COMPLETE" ) );
		}

		_this.response = function () {
			return _response;
		}

		_this.script = function () {
			return _script;
		}

		_this.isLoading = function ( script ) {
			return ( findBaseName ( _script ) == findBaseName ( script ) );
		}

		_this.load = function () {

				// save to refernece lataer
			_request.open ( "GET", _script, true );
			_request.send ( null );
		}

		_this.addDependency = function ( val ) {

				// check if we already added this dependency

			var baseName = findBaseName ( val );
			_dependencies.push ( baseName );
			if ( _dependencies.indexOf ( baseName ) == -1 ) {
				_dependencies.push ( baseName );
			}

			console.log ( _dependencies );
		}

		_this.isDependent = function ( fileInclude ) {
			var baseName = findBaseName ( fileInclude.script () );
			console.log ( baseName + " " + _script );
			console.log ( _dependencies );
			_dependencies
			return ( _dependencies.indexOf ( baseName ) > -1 ) ? true : false;
		}

		_this.release = function () {

			_script = undefined;
			_request = undefined;

			for ( var property in _this ) {
				delete _this [ property ];
			}
			_this = undefined;

			for ( var property in _super ) {
				delete _super [ property ];
			}
			_super = undefined;
			
		}

		return _construct ( script );
	}

	function AbstractPlugin () {

		var _super = {};
		var _this = AbstractEventDispatcher.call ( this );

		function _construct () {
			return _this;
		}

		_this.loadScript = function ( script ) {
			return script;
		}

		_this.fileLoaded = function ( fileInclude ) {

		}

		_this.filterResponse = function ( repsonse ) {
			return repsonse;
		}

		_this.filterLine = function ( line ) {
			return line;
		}

		_this.toString = function () {
			return "REQUIRE-PLUG-IN";
		}

		return _construct ();
	}

	var require = require || new function () {
		"use strict";

		var _this = this,
		_config,
		_fileIncludeSet,
		_pluginSet,
		_readyCallbackSet;


			/*******************************
			*
			********************************/
		function _construct () {

			_pluginSet = [];
			_fileIncludeSet = [];
			_readyCallbackSet = [];
			_config = { "baseUrl" : "js/", "paths" : {}, "alias" : {}, "debug" : false };

				// as a courtesy let's load the file included in the data-main
			var requireScript = document.querySelector ( "script#require_script" ); 

				// load plug-ins or directly include the entry point
			var plugins = requireScript.getAttribute ( "data-plugins" );
			if ( !isEmpty ( plugins ) ) {
				_loadPlugins ( plugins.split ( "\s*,\s*" ) );
			} else {
				_this.include ( requireScript.getAttribute ( "data-main" ) );
			}
			

			

			// document.write ( require.compile ().replace ( "^\s*require.*$", "" ) );

		}

		function _loadPlugins ( pluginSet ) {

				// load the AbstractPlugin
			_this.plugins = { "AbstractPlugin" : AbstractPlugin };

			var baseUrl = _getBase ();

			for ( var i = 0; i < pluginSet.length; i++ ) {
				var fileInclude = new FileInclude ( baseUrl + pluginSet [ i ] );
				fileInclude.addEventListener ( "COMPLETE", _onPluginLoad_listener );
				_pluginSet.push ( fileInclude );
				fileInclude.load ();
			}
		}

		function _getAliases ( scriptName ) {
		
				// get the current alias associated with the scriptName
			var alias = _config.alias [ scriptName ];

				// there's no alias so send back the script's url
			if ( scriptName instanceof Array ) {

				alias = scriptName;
			} else if ( isEmpty ( alias ) ) {
				alias = [ scriptName ];
			} else if ( typeof ( alias ) == "string" ) {
				alias = [ alias ];
			}

			return alias;
		}

			/*******************************
			*
			********************************/
		function _isScriptLoaded ( scriptName ) {

				// find the base name and compare
			var baseName = findBaseName ( scriptName );

			for ( var i = 0; i < _fileIncludeSet.length; i++ ) {
				if ( _fileIncludeSet [ i ].isLoading ( scriptName ) ) {
					return true;
				}
			}

			return false;
		}

			/*******************************
			*
			********************************/
		function _getBase () {
			var baseUrl = _config.baseUrl;
			return ( baseUrl.substr ( -1 ) == "/" || baseUrl == "" ) ? baseUrl : baseUrl + "/"; 
		}

			/*******************************
			*
			********************************/
		function _getScripts ( scriptName ) {

				// extract an alias if one is available
			var scriptSet = _getAliases ( scriptName );

				// let get magical. If a array is passed in we import the array
			for ( var i = 0; i < scriptSet.length; i++ ) { 
				scriptSet [ i ] = ( scriptSet [ i ].match ( /(.+?\/)*.+?\.js/ ) ) ? scriptSet [ i ] : scriptSet [ i ] + ".js";
			}

			return scriptSet;
		}


		function _importDependencies ( fileInclude ) {
				// find any import and import those files
			var preprocessRegExp = /(require.config|require.include)\s*\(([\S\s]+?)\)\s*\;?/gi;
			var result;
			while ( !isEmpty ( result = preprocessRegExp.exec ( fileInclude.response () ) ) ) {

					// sweet! Let add to the dependency list
				if ( result [ 1 ] == "require.include" ) {
					var scripts = eval ( result [ 2 ] );

					if ( scripts instanceof Array ) {
						for ( var i = 0; i < scripts.length; i++ ) {
							var processedScriptSet = _getScripts ( scripts [ i ] );
							for ( var j = 0; j < processedScriptSet.length; j++ ) {
								fileInclude.addDependency ( processedScriptSet [ j ] );
							}
						}
					} else {
						var processedScriptSet = _getScripts ( scripts );
						for ( var j = 0; j < processedScriptSet.length; j++ ) {
							fileInclude.addDependency ( processedScriptSet [ j ] );
						}
					}
				}
				
				eval ( result [ 0 ] );
			}
		}

		function _processIncludedFile_listener ( event ) {

			var fileInclude = event.target [ 0 ];

				// filter the response. Here's where we can add in the plug-in architecture
			var response = _filterResponse ( fileInclude.response () );

				// import the next set of items
			_importDependencies ( fileInclude );


				// have we loaded all the dependencies
			for ( var i = 0; i < _fileIncludeSet.length; i++ ) {
				if ( isEmpty ( _fileIncludeSet [ i ].response () ) ) {
					return;
				}
			}

				// we did all done
			_loadComplete ();

				// were done release the fileInclude
			//fileInclude.release ();
		}

		function _onPluginLoad_listener ( event ) {

				// replace the current FileInclude with a instance
			var fileInclude = event.target [ 0 ];
			var indexOf = _pluginSet.indexOf ( fileInclude );
			_pluginSet [ indexOf ] = new ( eval ( fileInclude.response () ) ( AbstractPlugin ) );

				// check if all the plug-ins are loaded
			for ( var i = 0; i < _pluginSet.length; i++ ) {
				if ( String ( _pluginSet [ i ] ) !== "REQUIRE-PLUG-IN" ) {
					return;
				}
			}

				// all plug-ins are loaded, let's now load the entry point
			var requireScript = document.querySelector ( "script#require_script" ); 
			_this.include ( requireScript.getAttribute ( "data-main" ) );
		}

		function _filterResponse ( response ) {

				// first filter line by line
			var lines = response.split ( '\n' );
			var output = ""; 
			for ( var i = 0; i < lines.length; i++ ) {
    			for ( var j = 0; j < _pluginSet.length; j++ ) {
    				output += _pluginSet [ j ].filterLine ( lines [ i ] );
    			}
			}

			for ( var j = 0; j < _pluginSet.length; j++ ) {
    			output = _pluginSet [ j ].filterResponse ( output );
    		}

			return output;
		}

		function _sortFileIncludes ( a, b ) {
			
			console.log ( "_sortFileIncludes: " + a.script () + " " + b.script () + " D: " + a.isDependent ( b ) )

			if ( a.isDependent ( b ) ) {
				return -1;
			}

			return 0;
		}

		function _loadComplete () {

				// now sort the file includes
			_fileIncludeSet.sort ( _sortFileIncludes );
			

			 	// compile the code;
			var output = "";
			if ( _config.debug ) {
				for ( var i = 0; i < _fileIncludeSet.length; i++ ) {
					output += "<script type='text/javascript' src='" +  _fileIncludeSet [ i ].script () + "'></script>\n";
				}
			} else {
				output = "<script id='require_compiled'>";
				for ( var i = 0; i < _fileIncludeSet.length; i++ ) {
					output += _filterResponse ( _fileIncludeSet [ i ].response () ) + "\n";
				}
				output += "</script>";
			}

			console.log ( _fileIncludeSet );
			console.log ( output );
			console.log ( document.querySelector ( "head" ) )

			document.querySelector ( "head" ).innerHTML += output;

				// execute the ready functions
			for ( var i = 0; i < _readyCallbackSet.length; i++ ) {
				console.log ( "ummmm" );
				_readyCallbackSet [ i ].call ();
			}
		}
 

			/*******************************
			*
			********************************/
		function _include ( scriptName ) {

			console.log ( scriptName );

			var baseUrl = _getBase ();
			var scriptURLSet = _getScripts ( scriptName );

				// loop through each script and load it
			for ( var i = 0; i < scriptURLSet.length; i++ ) {

					// check if we already have the file in the loading set
				if ( !_isScriptLoaded ( scriptURLSet [ i ] ) ) {

					console.log ( "------ " + baseUrl + scriptURLSet [ i ] );

					var fileInclude = new FileInclude ( baseUrl + scriptURLSet [ i ] );
					fileInclude.addEventListener ( "COMPLETE", _processIncludedFile_listener );

						// prevent circular dependencies
					_fileIncludeSet.push ( fileInclude );

					fileInclude.load ();
				} else {
					console.log ( "already loaded. Ain't one have time for that" );
				}
				
			}
		};

		_this.include = function ( script ) {
				// point of entry. A bit abstract but it works. Sweep it under the rug... Just sweep! :P
			if ( script instanceof Array ) {
				for ( var i = 0; i < script.length; i++ ) {
					_include ( script [ i ] );
				}
			} else {
				_include ( script );
			}
		}

		_this.config = function ( config ) {
	
				// just loop through and overwrite properties
			for ( var property in config ) {
				_config [ property ] = config [ property ];
			}
		}

		_this.ready = function ( callback ) {
			_readyCallbackSet.push ( callback );
		}

		return _construct ();
	};

} () );



















/* if ( request.status === 200 ) {

	  				// mark the script as loaded so we don't load again later
	  			_addLoadedScript ( request.responseText, _findBaseName ( scriptName ), scriptURL );

	  				// done loading the script we can remove it
	  			_isLoadingSet.splice ( _isLoadingSet.indexOf ( scriptName ), 1 );

			} else if ( request.status === 404 ) {
				console.log ( "require.import ()  script not found: " + scriptURL );
			}
		} */