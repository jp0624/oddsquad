require.config( {"baseUrl": "../../"});
require.include('storage/KeyValueStorage.js');

$(document).ready ( function () {
	// the KeyValueStorage object is a singleton, you can reference it, just as
	// KeyValueStorage.get, KeyValueStorage.set, etc.

	// you can set a series of default values.
	// they will be stored as strings.
	KeyValueStorage.setDefaults({
		"x": 5,
		"y": 10
	});

	// display the value of x, should show as "x=5"
	alert("x=" +KeyValueStorage.get("x"));

	// set a value.
	KeyValueStorage.set("y", 50);

	// NOTE: everything is stored as a string.
	// this will show "y+2(as string)=502"
	alert("y+2(as string)=" + KeyValueStorage.get("y") + 2);

	// If you store a number, it will need to be parsed.
	// this will show "y+2(parsed)=52"
	var y = parseFloat(KeyValueStorage.get("y"));
	alert("y+2(parsed)=" + (y + 2));

	// no need to parse numbers yourself, just use the helper methods.
	// NOTE: in the current implementation, these functions will cause errors
	// if the underlying value is not a string that can be parsed to a float
	// or an int, so be sure that what you save is parseable before using these
	// functions.
	alert("y+2(float)=" + (KeyValueStorage.getFloat("y") + 2));
	alert("y+2(int)=" + (KeyValueStorage.getInt("y") + 1));

	// this resets all the values to their defaults.
	KeyValueStorage.resetToDefaults();

	// should return the default value
	// this will show "y(default)=10"
	alert("y(default)=" + KeyValueStorage.get("y"));
});

