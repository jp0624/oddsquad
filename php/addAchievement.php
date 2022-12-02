<?php

/* 
 * add an achievement for given user
 */

require_once 'agent.php';

$validLockers = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44");

$agent = new Agent();
$agent->connect();
$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");
$locker = filter_input(INPUT_POST, "achievement");
$type = filter_input(INPUT_POST, "type");

if (!in_array($locker, $validLockers)) { return; }

$agent->addAchievement($userid, $locker, $type);


