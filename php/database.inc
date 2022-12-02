<?php
	if (php_uname('n') == 'oddsquad-dev1') { // ERNIE/BERT
		$DB_SERVER = "localhost";
		$DB_NAME = "oddsquad";
		$DB_USER = "oddsquad";
		$DB_PASSWORD = "za6eSpeJU88RucAv";
	} elseif (php_uname('n') == 'oddsquad-stage1') { // SOUP
		$DB_SERVER = "localhost";
		$DB_NAME = "oddsquad";
		$DB_USER = "oddsquad";
		$DB_PASSWORD = "drefe45ru9ruspuM";
	} else { // LIVE
		$DB_SERVER = "oddsquad-prod.cgtgaaouq7fe.us-east-1.rds.amazonaws.com";
		$DB_NAME = "oddsquad";
		$DB_USER = "oddsquad";
		$DB_PASSWORD = "iK2akGKJbY1wR9b";
	}
?>