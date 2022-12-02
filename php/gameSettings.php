<?php
/*
	Get/Set game settings
	Key/Value pairs are stored in database, indexed by userID

	Gets userID value from pbskids_userid cookie

	Params:
		a :	Action to take, either "set", "get", "getAll", or "delete"
		key :	Key to set/get
		value :	Value to set key to
		
	Returns a JSON object with these properties:
		code :		1 = success
				-1 = user not logged in
		message :	Text explanation of the code
		action :	The action passed in
		key :		The key passed in
		value :		The value, either as passed in (a=set) or fetched from the db (a=get)
*/

include_once(dirname(__FILE__) . '/GameSettings.inc');

$result = new stdClass();
$result->code = 1;
$result->message = 'OK';


$userID = $_COOKIE['pbskids_userid'];
if (!$userID)
{	$result->code = -1;
	$result->message = 'User not logged in';
	print json_encode($result);
	exit;
}


$action = isset($_POST['a']) ? $_POST['a'] : null;
switch ($action)
{
	case 'set' :
	case 'getAll' :
	case 'delete' :
	case 'deleteAll' :
		// valid actions
		break;
	default : 
		$action = 'get';
}

$key = isset($_POST['key']) ? $_POST['key'] : null;
$value = isset($_POST['value']) ? $_POST['value'] : null;


$result->action = $action;
$result->key = $key;
$result->value = $value;
$result->collection = null;


$gameSetting = new GameSettings();
$gameSetting->connect();
$gameSetting->setUserID($userID);

if ($action == 'set')
{
	$gameSetting->setValueForKey($key, $value);

}else if ($action == 'delete')
{
	$gameSetting->deleteKey($key);

}else if ($action == 'deleteAll')
{
	$gameSetting->deleteAll();

}else if ($action == 'getAll')
{
	$result->collection = $gameSetting->getAll();

}else
{
	$result->value = $gameSetting->getValueForKey($key);
}

print json_encode($result);
exit;

?>
