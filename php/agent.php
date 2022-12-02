<?php

/**
 * main class to manipulate agent info
 */
require_once("database.inc");


class Agent {

	const DB_TABLE = "agents";
	const DB_ACHIEVEMENTS_TABLE = "achievements";
	const VIEWED = "viewed";
	
	
	var $db;
	
	/**
	 * connect to the database
	 */
	function connect() {
	
		$this->db = new PDO('mysql:host='.$GLOBALS['DB_SERVER'].';dbname='.$GLOBALS['DB_NAME'].';charset=utf8', $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD']);
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	
	
	/**
	 * find user by name
	 */
	function findByUsername($username) {
		
		$stmt = $this->db->query('SELECT * FROM ' . self::DB_TABLE . ' WHERE username = "' . $username . '"');
		$results = $stmt->fetch(PDO::FETCH_ASSOC);
		return $results;
	}
	
	
	/**
	 * find user by id
	 */
	function findByUserId($userid) {
		
		$stmt = $this->db->query('SELECT * FROM ' . self::DB_TABLE . ' WHERE userid = "' . $userid . '"');
		$results = $stmt->fetch(PDO::FETCH_ASSOC);
		return $results;
	}

	function updateUser($username, $userid, $agentName, $avatar, $background, $agentNumber) {
		$stmt = $this->db->prepare('UPDATE ' .self::DB_TABLE. ' SET agentName =  ?, agentNumber = ?, avatar = ?, background = ? WHERE userid = ?');
		$stmt->execute(array($agentName, $agentNumber, $avatar, $background, $userid));
		//return ('UPDATE ' .self::DB_TABLE. ' SET agentName =  "' . $agentName . '", agentNumber = ' . $agentNumber . ', avatar = "' . $avatar . '", background = ' . $background . ' WHERE userid = "' . $userid . '"');
		// return $stmt;
	}
	
	
	/**
	 * add a new user
	 */
	function addNewUser($username, $userid, $agentName, $avatar, $background, $agentNumber) {
		
		$stmt = $this->db->prepare("INSERT INTO ".self::DB_TABLE."(username, userid, agentName, agentNumber, avatar, background) VALUES(:username,:userid,:agentName,:agentNumber,:avatar,:background)");
		$stmt->execute(array(':username' => $username, ':userid' => $userid, ':agentName' => $agentName, ':agentNumber' => $agentNumber, ':avatar' => $avatar, ':background' => $background));
		$affected_row = array("username" => $username, "userid" => $userid, ":agentName" => $agentName, "agentNumber" => $agentNumber, "avatar" => $avatar, ':background' => $background);
		return $affected_row;
	}

	
	/**
	 * convert username to key
	 */
	function buildAgentNumber($agentName) {
		
		$agentName = strtolower($agentName);
		$i = 0;
		$n = strlen($agentName);
		$t = 0;
		while ($i < $n) {
			$c = ord(substr($agentName, $i, 1)) - 96;
			$t += $c;
			$i++;
		}
		$agentNumber = $t;
		
		return $agentNumber;
	}
	
	
	/**
	 * add achievement of any type to database (regular, unlocked, viewed)
	 */
	function addAchievement($id, $achievement, $type) {
		
		switch ($type) {
			case self::VIEWED: $column = "achievementsViewed"; break;
			default: $column = "achievements";
		}
		
		$achievement = strval($achievement);
	
		$stmt = $this->db->query('SELECT * FROM ' . self::DB_ACHIEVEMENTS_TABLE . ' WHERE userid = "' . $id . '"');
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		
		$row_cnt = $stmt->rowCount();
		
		if($row_cnt < 1) {
			$stmt = $this->db->prepare("INSERT INTO ".self::DB_ACHIEVEMENTS_TABLE."(userid, achievements, achievementsViewed) VALUES(:userid, '','')");
			$stmt->execute(array(':userid' => $id));
			
			$stmt = $this->db->query('SELECT * FROM ' . self::DB_ACHIEVEMENTS_TABLE . ' WHERE userid = "' . $id . '"');
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
		}
		
		if (is_null($result[$column]) || $result[$column] == "") {
			$s = $achievement;
		}
		else {
			$a = explode("/", $result[$column]);
			$n = count($a);
			$s = "";
			$found = false;
			for ($i = 0; $i < $n; $i++) {
				if ($a[$i] == $achievement) { $found = true; }
				if ($s != "") { $s = $s . "/"; }
				$s = $s . $a[$i];
			}
			if ($found == false) { $s = $s . "/" . $achievement; }
		}
		
		echo $s;
		
		$update = $this->db->prepare('UPDATE ' . self::DB_ACHIEVEMENTS_TABLE . 
				" SET $column=? WHERE userid=?");
		$update->execute(array($s, $id));
	}
	
	
	/**
	 * return achievements (unlocked, viewed or default) of current user
	 */
	function getAchievement($userid, $type) {
		
		switch ($type) {
			case self::VIEWED: $column = "achievementsViewed"; break;
			default: $column = "achievements";
		}
		
		$stmt = $this->db->query('SELECT * FROM ' . self::DB_ACHIEVEMENTS_TABLE . ' WHERE userid = "' . $userid . '"');
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($result && !is_null($result[$column])) { return $result[$column]; }
		else { return ""; }
	}
	

	/**
	 * clear all achievements for this person
	 */
	function clearAchievements($userid) {
		
		$result = $this->findByUserId($userid);
		if ($result) {
			$update = $this->db->prepare('UPDATE ' . self::DB_ACHIEVEMENTS_TABLE . 
					' SET achievements=?, achievementsViewed=? WHERE userid=?');
			$update->execute(array("", "", $userid));
		}
	}

	
	/*
	 * add an a locker item for a specific user (or make it viewed)
	 */
	function addLocker($id, $locker, $type) {
		
		switch ($type) {
			case self::VIEWED: $column = "lockerViewed"; break;
			default: $column = "locker";
		}
		
		$locker = strval($locker);
	
		$stmt = $this->db->query('SELECT * FROM ' . self::DB_TABLE . ' WHERE id = "' . $id . '"');
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if (is_null($result[$column]) || $result[$column] == "") {
			$s = $locker;
		}
		else {
			$a = explode("/", $result[$column]);
			$n = count($a);
			$s = "";
			$found = false;
			for ($i = 0; $i < $n; $i++) {
				if ($a[$i] == $locker) { $found = true; }
				if ($s != "") { $s = $s . "/"; }
				$s = $s . $a[$i];
			}
			if ($found == false) { $s = $s . "/" . $locker; }
		}
		
		echo $s;
		
		$update = $this->db->prepare('UPDATE ' . self::DB_TABLE . 
				" SET $column=? WHERE id=?");
		$update->execute(array($s, $id));
	}
	
	
	/**
	 * return all achievements of current user
	 */
	function getLocker($userid, $type) {
		
		switch ($type) {
			case self::VIEWED: $column = "lockerViewed"; break;
			default: $column = "locker";
		}
		
		$result = $this->findByUserId($userid);
		if ($result && !is_null($result[$column])) { return $result[$column]; }
		else { return ""; }
	}
	
	
	/**
	 * clear locker for this person
	 */
	function clearLocker($userid) {
		
		$result = $this->findByUserId($userid);
		if ($result) {
			$update = $this->db->prepare('UPDATE ' . self::DB_TABLE . 
					' SET locker=?, lockerViewed=? WHERE id=?');
			$update->execute(array("", "", $result['id']));
		}
	}
	
	
	/**
	 * set the background for htis person
	 */
	function setBackground($userid, $background) {
		
		$result = $this->findByUserId($userid);
		if ($result) {
			$update = $this->db->prepare('UPDATE ' . self::DB_TABLE . 
					' SET background=? WHERE id=?');
			$update->execute(array($background, $result['id']));
		}
	}
}
