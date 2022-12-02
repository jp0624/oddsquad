<?php

require_once("database.inc");

class GameSettings
{
	const DB_TABLE = "gameSettings";

	var $db;
	var $userID;


	function setUserID($id)
	{	$this->userID = $id;
	}


	
	function connect()
	{
		$this->db = new PDO('mysql:host='.$GLOBALS['DB_SERVER'].';dbname='.$GLOBALS['DB_NAME'].';charset=utf8', $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWORD']);
		//$this->db = new PDO('mysql:host=localhost;dbname='.self::DB_NAME.';charset=utf8', self::DB_USER, self::DB_PASSWORD);
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}


	
	function setValueForKey($key, $value)
	{
		$sth = $this->db->prepare('REPLACE INTO ' . self::DB_TABLE . ' (userID, setting, value) VALUES (:userID, :key, :value)');
		$sth->bindParam(':userID', $this->userID, PDO::PARAM_INT);
		$sth->bindParam(':key', $key, PDO::PARAM_STR);
		$sth->bindParam(':value', $value, PDO::PARAM_STR);
		$sth->execute();
	}



	function getValueForKey($key)
	{
		$sth = $this->db->prepare('SELECT value FROM ' . self::DB_TABLE . ' WHERE userid = :userID AND setting = :key');
		$sth->bindParam(':userID', $this->userID, PDO::PARAM_INT);
		$sth->bindParam(':key', $key, PDO::PARAM_STR);
		$sth->execute();
		$row = $sth->fetch(PDO::FETCH_ASSOC);
		return $row ? $row['value'] : null;
	}



	function getAll()
	{
		$sth = $this->db->prepare('SELECT setting, value FROM ' . self::DB_TABLE . ' WHERE userid = :userID');
		$sth->bindParam(':userID', $this->userID, PDO::PARAM_INT);
		$sth->execute();
		$row = $sth->fetchAll(PDO::FETCH_ASSOC);
		return $row ? $row : null;
	}



	function deleteKey($key)
	{
		$sth = $this->db->prepare('DELETE FROM ' . self::DB_TABLE . ' WHERE userid = :userID AND setting = :key');
		$sth->bindParam(':userID', $this->userID, PDO::PARAM_INT);
		$sth->bindParam(':key', $key, PDO::PARAM_STR);
		$sth->execute();
	}
	


	function deleteAll()
	{
		$sth = $this->db->prepare('DELETE FROM ' . self::DB_TABLE . ' WHERE userid = :userID');
		$sth->bindParam(':userID', $this->userID, PDO::PARAM_INT);
		$sth->execute();
	}
	
}

?>
