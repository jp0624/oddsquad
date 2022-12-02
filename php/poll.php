<?php

require_once("database.inc");

/**
 * Main class to manipulate polls.
 */
class Poll {
	var $db;

	/**
	 * Connect to the database.
	 */
	function connect() {
		$this->db = new PDO('mysql:host='.$GLOBALS['DB_SERVER'].';dbname='.$GLOBALS['DB_NAME'].';charset=utf8', $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD']);
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	/**
	 * Submit a poll answer
	 * @param  [Integer] $pollId   - The Poll Identifier.
	 * @param  [Integer] $answerId - The Answer Identifier.
	 */
	function submitPollAnswer($pollId, $answerId) {
		$pollId = intval($pollId);
		$answerId = intval($answerId);
		$stmtString = 'UPDATE polls SET AnswerCount = AnswerCount + 1 WHERE PollId = :pollId AND AnswerId = :answerId';
		$stmt = $this->db->prepare($stmtString);
		$stmt->bindParam(':pollId', $pollId, PDO::PARAM_INT);
		$stmt->bindParam(':answerId', $answerId, PDO::PARAM_INT);
		$stmt->execute();
	}

	function getPollAnswers($pollId) {
		$pollId = intval($pollId);

		$stmtString = "SELECT AnswerId, AnswerCount from polls WHERE PollId = :pollId";
		$stmt = $this->db->prepare($stmtString);
		$stmt->bindParam(':pollId', $pollId, PDO::PARAM_INT);
		$stmt->execute();

		$results = array();
		while( $result = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$newRow = $results[$result["AnswerId"]] = $result["AnswerCount"];
		}

		return $results;

	}
}