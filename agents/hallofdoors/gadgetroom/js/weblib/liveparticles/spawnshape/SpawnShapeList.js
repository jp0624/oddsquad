/* global require, ss */
require.include("weblib/ssnamespace");

//Defines a list of available spawn shapes
ss.SpawnShapeList = [
	"BoxSpawnShape",
	"LineSpawnShape",
	"RaidalSpawnShape"
];

//Maintain backwards compatibility
var SpawnShapeList = ss.SpawnShapeList; //jshint ignore:line