<?php

/**
 * create a new user
 */
require_once 'agent.php';

$agent = new Agent();
$agent->connect();

$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");
$agentName = filter_input(INPUT_POST, "agentName");
$avatar = filter_input(INPUT_POST, "avatar");
$background = filter_input(INPUT_POST, "background");
$agentNumber = filter_input(INPUT_POST, "agentNumber");

$return = $agent->updateUser($username, $userid, $agentName, $avatar, $background, $agentNumber);
echo $return;
