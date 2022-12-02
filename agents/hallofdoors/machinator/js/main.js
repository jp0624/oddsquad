(function($) {

	//initiate responsive font sizing
	$.fn.flowtype = function(options) {
	
	  var settings = $.extend({
		 maximum   : 9999,
		 minimum   : 1,
		 maxFont   : 9999,
		 minFont   : 1,
		 fontRatio : 30
	  }, options),
	
	  changes = function(el) {
		 var $el = $(el),
			elw = $el.width(),
			width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
			fontBase = width / settings.fontRatio,
			fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
		 $el.css('font-size', fontSize + 'px');
	  };
	
	  return this.each(function() {
	  // Context for resize callback
		 var that = this;
	  // Make changes upon resize
		 $(window).resize(function(){changes(that);});
	  // Set changes on load
		 changes(this);
	  });
	};
	
})(jQuery);

/* global $, agentQuestions, fillerQuestions */
$(document).on('click', '.replay-quiz', function(){
	location.reload();
});

$(document).ready(function () {


	setTimeout(function () {
		
		$('body').flowtype({
			minimum   : 100,
			maximum   : 1500,
			fontRatio : 40
		});
		
	}, 50);

	var i;

	// The number of filler questions to use.
	var num_fillers = 2;

	// The css classes for each question block.
	var questionClasses = [".question1", ".question2", ".question3"];

	// The information about the agent that the user was matched with.
	var selectedAgent = "";
	var additionalInfo = "";
	var agentImage = "";

	// pick an agent question.
	var agentQuestionChoice = agentQuestions[ Math.floor(Math.random() * agentQuestions.length)];

	// pick filler questions.
	var fillerQuestionChoices = [];

	for (i = 0; i < num_fillers; i++){
		// randomly select a question index.
		var randIndex = Math.floor(Math.random() * fillerQuestions.length);
		// add it to the list of filler questions chosen, and remove it from
		// the options list so we don't pick it again.
		fillerQuestionChoices.push(fillerQuestions[randIndex]);
		fillerQuestions.splice(randIndex, 1);
			// NOTE: splice is kind of expensive, and not garbage collection friendly,
			// but it's okay here because we're doing it on intialization,
			// and have very few options to select from, so the cost is minimal.

	}

	// make a list of all the questions.
	var allQuestions = [];

	// add the "agent" question to the list of all questions.
	allQuestions.push(agentQuestionChoice);
	for (i = 0; i < fillerQuestionChoices.length; i++){
		// add each of the filler questions to the list of all questions.
		allQuestions.push(fillerQuestionChoices[i]);
	}

	// shuffle the list of questions.
	var shuffledQuestions = [];
	while(allQuestions.length > 0) {
		// grab a random question from the list.
		var index = Math.floor(Math.random() * allQuestions.length);

		// stick it on the shuffled list, and splice from the all questions list.
		// see the NOTE above about using splice.
		shuffledQuestions.push(allQuestions[index]);
		allQuestions.splice(index, 1);
	}

	// shuffle the answers.
	for (i = 0; i < shuffledQuestions.length; i++) {
		// for each question:
		// get the unshuffled list of answers.
		var old_answers = shuffledQuestions[i].answers;
		var new_answers = [];

		// while there are stlil answers:
		while(old_answers.length > 0) {
			// grab a random index.
			var answerIndex = Math.floor(Math.random() * old_answers.length);

			// stick it on the shuffled list.
			new_answers.push(old_answers[answerIndex]);
			old_answers.splice(answerIndex, 1);
		}

		// assign the shuffled list to the question.
		shuffledQuestions[i].answers = new_answers;
	}

	// setup the questions and their answers.
	for (i = 0; i < shuffledQuestions.length; i++) {
		// Find the each question's section on the page.
		var $question = $(questionClasses[i]);

		// set the question text.
		$question.find("h3 span").text(shuffledQuestions[i].question);

		// loop through the answer <li>s
		var $answers = $question.find("li");
		$answers.each(function (index) {
			var $li =  $( this );
			// set the text on each one.
			$li.find("span").text(shuffledQuestions[i].answers[index].text);
			$li.find("input").attr("data-answer-index", index);
			$li.find("label").attr("data-question_id", i);
		});

		// set the question id on the submit button.
		//var $submitButton = $question.find(".btn-submit");
		//$submitButton.attr("data-question_id", i);

		// add the submit button's click listener.
		//$submitButton.click(handleSubmit);
	}

	$('.question label').on('click', function(){

		$(this).closest('ul').find('li').removeClass('selected');
		$(this).closest('li').addClass('selected');

		var select_radio = $(this).children('input[type=radio]');
		var selected_val = select_radio.val();

		var ans_select = $('select[name="' + select_radio.attr('name') + '"]');

		ans_select.find('option:checked').removeAttr('selected');

		ans_select.find('option[value="' + selected_val + '"]').attr('selected', 'selected');
		
		handleSubmit(this);
	});

	/**
	 * Updates the containers class step value
	 */
	 
	 function stepChange(questionId){
		 
		var container = $('.overlay-matchinator');
		var step = parseInt(questionId) + 1;
		
		$(container).removeClass(function (index, css) {
			return (css.match (/(^|\s)step-\S+/g) || []).join(' ');
		});
		$(container).addClass('step-' + step);
	 }

	/**
	 * Handle clicking the submit buttons.
	 */
	function handleSubmit(self){
		
		// using the data attribute on the object, figure out which question identifier we're using.
		var questionId = parseInt($(self).attr("data-question_id"));

		// get the name of the question.
		var questionName = "question"+(questionId + 1);
		
		// change step id class value
		stepChange(questionId);
		
		// figure out which radio button was selected for the question.
		var answer = $("input[name='"+questionName+"']:checked");

		// get the index into the answer.
		var answerIndex = parseInt(answer.attr("data-answer-index"));

		// get the answer that was picked.
		var answerPicked = shuffledQuestions[questionId].answers[answerIndex];
		if(typeof(answerPicked) === "undefined") {
			// if none was picked, don't do anything else, we want the user to answer each
			// question before moving on.
			return;
		}

		// check if the answer belonged to the special "agent" question.
		if(typeof answerPicked.agent !== "undefined") {
			// if it did belong to the agent question, pull out the agent info, and
			// store it for when we display the matched agent at the end.
			selectedAgent = answerPicked.agent;
			additionalInfo = answerPicked.additional_info;
			agentImage = answerPicked.image;
		}

		// check if we're at the end of the question list.
		if(questionId < shuffledQuestions.length - 1) {
			// if this isn't the last question, hide it, and
			// show the next one.
			$("."+questionName).removeClass("show");
			$(".question" + (questionId + 2)).addClass("show");
		} else {
			// if it is the last question, hide it, and call the done() method to
			// display the results.
			$("."+questionName).removeClass("show");
			done();
		}
	}

	/**
	 * Run when the quiz is done to show the results.
	 */
	function done() {
		// show the agent info section, and set the agent info.
		$(".agentInfo").addClass("show");
		$(".agentInfo").find("h1").text(selectedAgent);
		$(".agentInfo").find("h3 span").text(additionalInfo);
		$(".agentInfo").find("img").attr("src",'/oddsquad/img/agents/' + agentImage);
	}

});