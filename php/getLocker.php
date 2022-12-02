<?php

require_once 'agent.php';
$agent = new Agent();
$agent->connect();
$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");

echo $agent->getLocker($userid, "") . "|" . $agent->getLocker($userid, Agent::VIEWED);


