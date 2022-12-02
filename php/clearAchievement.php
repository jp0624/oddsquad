<?php

/* 
 * add an achievement for given user
 */

require_once 'agent.php';
$agent = new Agent();
$agent->connect();
$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");

$agent->clearAchievements($userid);
