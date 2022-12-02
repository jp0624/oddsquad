<?php

/**
 * get agent info by id
 */

require_once 'agent.php';

$agent = new Agent();
$agent->connect();
$username = filter_input(INPUT_POST, "username");
$userid = filter_input(INPUT_POST, "userid");

$result = $agent->findByUserId($userid);

echo $result['agentName'] . '~~' . $result['agentNumber'] . '~~' . $result['avatar'] . '~~' . $result['background'];