<?php

/* 
 * add a locker item for given user
 */

require_once 'agent.php';

$validLockers = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13");

$agent = new Agent();
$agent->connect();
$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");
$locker = filter_input(INPUT_POST, "locker");
$type = filter_input(INPUT_POST, "type");

if (!in_array($locker, $validLockers)) { return; }

$result = $agent->findByUserId($userid);

if ($result) {
	$agent->addLocker($result['id'], $locker, $type);
}

