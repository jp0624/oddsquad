<?php

$timestamp = time ();
$public_API_key = "api_key_LsgqzYnabRAZD0VY5317eZ5its";
$secret_API_key = "secret_key_0bGEtB1KqwP34nPfoeZHs5P0";

$endPoint = "sam.services.pbskids.org/api/post/oddsquad_question";

$hash = hash_hmac ( "sha1", "$endPoint?api_key=$public_API_key&timestamp=$timestamp", $secret_API_key );

?>
<!DOCTYPE html>
<html lang=en>
	<head>
		<title>Question</title>

		<link href="css/font.css" rel="stylesheet" type="text/css" />
		<link href="css/userquestions.css" rel="stylesheet" type="text/css" />
		<link href="css/ugc.css" rel="stylesheet" type="text/css" />

		<script type="text/javascript" src="//use.typekit.net/nuo4rii.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

		<script type="text/javascript" src="js/external/jquery-1.11.1.min.js"></script>
		<script type="text/javascript" src="js/external/jquery.url.min.js"></script>

		<script id="compiled" src="js/compiled.js"></script>

	</head>
	<body>

		<form class="mainPage">

			<input type="hidden" name="timestamp" value="<?=$timestamp?>">
	    	<input type="hidden" name="api_key" value="<?=$public_API_key?>">
	    	<input type="hidden" name="hash" value="<?=$hash?>">
			<p class="questionHeading">
				Ask Olympia a Question
			</p>
			<p class="ageAndFirstName">
				<div id="labelHolder">
					<label class="leftLabel" for="name">First name:</label>
					<label class="rightLabel" for="age">Age:</label>
				</div>
				<div id="ageAndFirstNameInputHolder">
					<input type="text" class="textInput" name="name" placeholder="FIRST name" required maxlength="70">

					<input type="number" class="numberInput" min="0" step=1 name="age" placeholder="Age" max="99">
				</div>
			</p>
			<p class="question">
				<label class="questionLabel" for="question">Question:</label>
				<textarea maxlength=1000 rows=5 name="question" placeholder="Write your question here!" required></textarea>
			</p>
			<p class="missingField">
				* Please include your first name and your question *
			</p>

			<div class="submitButton"></div>

		</form>


		<div class="thanksPage">
		</div>

		<div class="closeButton">
		</div>

		<p id="disclaimer">Any entries that provide personal information will be removed. <br><br><span class="redText">Do not write: </span>Last name, username, email address, phone number, or location (address, city, street, school).</p>

		<div id="audioHolder">
		</div>

		<!-- UGC BORDER -->
		<div class="bgBox">
			<div class="bg"></div>
			<div class="tl"></div>
			<div class="t"></div>
			<div class="tr"></div>
			<div class="l"></div>
			<div class="r"></div>
			<div class="bl"></div>
			<div class="b"></div>
			<div class="br"></div>
		</div>

	</body>
</html>