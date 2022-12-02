<?php

/* 
 * set background # for given user
 */

require_once 'agent.php';
$agent = new Agent();
$agent->connect();
$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");
$background = filter_input(INPUT_POST, "background");

$agent->setBackground($userid, $background);
