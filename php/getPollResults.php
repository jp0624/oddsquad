<?php

require_once("poll.php");

$validPollIds = array(0, 1, 2);

$answerStrings = array (
			array("Noisemaker", "Lady Bread", "Fladam", "Evil Teddy", "Mr. Lightning"),
			array("Logo 1", "Logo 2", "Logo 3"),
			array("Creature Room", "Trophy Room", "Ball Pit")
		);

$pollId = filter_input(INPUT_GET, "pollId");

// Protect against invalid poll ids.
if(!in_array($pollId, $validPollIds)) { echo("Invalid PollId: "); return; }

$poll = new Poll();
$poll->connect();

$results = $poll->getPollAnswers($pollId);
$answer_lookup = $answerStrings[0];
switch($pollId) {
	case 0:
		echo("BEST WORST VILLAINS RESULTS:");
		$answer_lookup = $answerStrings[0];
		break;
	case 1:
		echo("TUBE TRAVEL RESULTS:");
		$answer_lookup = $answerStrings[1];
		break;
	case 2:
		echo("MEET AGENT OLO RESULTS:");
		$answer_lookup = $answerStrings[2];
		break;
}

echo("</br>");
for ($index = 0; $index < count($answer_lookup); $index++) {
	echo($answer_lookup[$index]);
	echo(": ");
	echo($results[$index]);
	echo("</br>");
}




