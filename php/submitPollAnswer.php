<?php

require_once("poll.php");

$validPollIds = array(0, 1, 2);
$validAnswers = array(
		array(0, 1, 2, 3, 4, 5, 6, 7),
		array(0, 1, 2),
		array(0, 1, 2)
	);

$pollId = filter_input(INPUT_POST, "pollId");
$answerId = filter_input(INPUT_POST, "answerId");

// Protect against invalid poll ids.
if(!in_array($pollId, $validPollIds)) { echo("Invalid PollId: "); return; }

// Protect against invalid answers.
$pollKey = array_search($pollId, $validPollIds);
if(!in_array($answerId, $validAnswers[$pollKey])) {echo("Invalid AnswerId"); return; }

// Connect to the DB, and submit the answer.
$poll = new Poll();
$poll->connect();
$poll->submitPollAnswer($pollId, $answerId);

echo("Poll submitted!");