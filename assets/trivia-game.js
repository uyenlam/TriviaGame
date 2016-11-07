$(document).ready(function(){

var questions = new Array();
	questions.push(new Object(question1 = {question:"During which month does summer end and fall begin?", rightAnswer: "September", photoLink:"assets/img/september.gif", explain: "Fall equinox on September 22 or 23 signals the start of the season.", answerchoices: ["August","September","October","November"]})),
	questions.push(new Object(question2 = {question:"What color is the Starbucks holiday cup this year?", rightAnswer: "Green", photoLink: "assets/img/starbucks.gif", explain: "I know right... That doesn't make sense to me either!", answerchoices:["White","Red","Green","Controversial like last year"]})),
	questions.push(new Object(question3 = {question:"When do Canadians celebrate Thanksgiving?", rightAnswer: "October", photoLink:"assets/img/canadian.gif", explain: "Canadians celebrate Thanksgiving on the second Monday in October.", answerchoices:["September","October","November","December"]})),
	questions.push(new Object(question4 = {question:"Which president made Thanksgiving an annual holiday at the end of November?", photoLink: "assets/img/lincoln.gif", rightAnswer: "Abraham Lincoln", explain: "Lincoln declared Thanksgiving a national holiday in 1863, to be celebrated each year on the last Thursday of November.", answerchoices:["Abraham Lincoln","George Washington","James Madison","Zachary Taylor"]})),
	questions.push(new Object(question5 = {question:"Which of the following foods was likely served at the first Thanksgiving in 1621?", photoLink:"assets/img/seafood.gif", rightAnswer: "Shellfish", explain: "Shellfish like mussels, clams and lobsters were plentiful in New England during the first Thanksgiving of 1621.", answerchoices:["Pumpkin Pie","Potatoes","Cranberry Sauce","Shellfish"]})),
	questions.push(new Object(question6 = {question:"The Detroit Lions played against which team in the first Thanksgiving Day NFL game in 1934?", photoLink:"assets/img/gobears.gif", rightAnswer: "Chicago Bears", explain: "The Lions have played a Thanksgiving Day football game every year since 1934, when they first took on the Chicago Bears.", answerchoices:["The Green Bay Packers","Chicago Bears","The Minnesota Vikings","The San Francisco 49ers"]})),
	questions.push(new Object(question7 = {question:"How many apples does it take to make one gallon of apple cider?", rightAnswer: 40, photoLink:"assets/img/apple.gif", explain: "But really though... Just buy cider at the store!", answerchoices:[20,30,40,50]})),
	questions.push(new Object(question8 = {question:"When is election day?", rightAnswer: "November 8", explain: "Did you vote?", photoLink:"assets/img/vote.gif", answerchoices:["November 8","November 30","December 1","Not this year"]})),
	questions.push(new Object(question9 = {question:"Which country consumes the most turkey per year per capital?", rightAnswer: "Israel", photoLink:"assets/img/turkey.gif", explain: "According to U.S. Department of Agriculture data, Israelis ate 28.9 pounds of turkey in 1999, the last year for which statistics are available. That same year Americans ate 17.6 pounds of the mouthwatering fowl.", answerchoices:["U.K","U.S.","Spain","Israel"]})),
	questions.push(new Object(question10 = {question:"How many TV shows are premiering new episodes this fall?", rightAnswer: 300, photoLink:"assets/img/gilmore.gif", explain: "Including a Gilmore Girls revival!", answerchoices:[10,5,300,62]})),

console.log(questions);

var theQuestion = [];
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var answerSelected = false;
var i = 0;
var button = '<button class="start-button">Start Over</button>';

var timeLeft = [];
var timer = {
	time: 15,
	reset: function(){
		timer.time = 15;
	},

	start: function(){
		counter = setInterval(timer.count,1000);
	},

	stop: function(){
		clearInterval(counter);
	},

	count: function(){
		timer.time--;
		var converted = timer.timeConverter(timer.time);
		console.log(converted);
		timeLeft.push(converted);
		$('#timer').html("Time left: " + converted + " seconds");
	},

	timeConverter: function(t){
		var minutes = Math.floor(t/60);
		var seconds = t - (minutes * 60);
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		return seconds;
	}
}
	


function clearDivs() {
	$('#timer').empty();
	$('#info-area').empty();
	$('#ans-or-gif').empty();
}

function rightNoti(){
	$('#timer').html("<p>Correct!</p>")
	correct++;
}

function wrongNoti(){
	$('#timer').html("<p>Sorry, that's not right</p>");
	incorrect++;
}

function showAnswers(){
	$('#info-area').html('<p> The correct answer is <b>' + theQuestion.rightAnswer + '</b>. ' + theQuestion.explain + '</p>');
	$('#ans-or-gif').html('<img src="'+ theQuestion.photoLink + '" alt="' + theQuestion.rightAnswer + '">');
	i++;
}

function stopCounting(){
	timer.stop();
	timer.reset();
}



//GAME START HERE-----------------------------------------------------------

function playGameGlobal(){

	$('.start-button').on('click', function(){

		function playGame(){

			clearDivs();
			clearTimeout();

			answerSelected = false;

			if(i === questions.length){
				clearDivs();
				$('#info-area').html('<p> Great job completing this quiz! Here\'s how you did.</p>');
				$('#ans-or-gif').html('<div> Correct: ' + correct + '</div><div> Incorrect: ' + incorrect + '</div><div> Unanswered: ' + unanswered + '</div><div>' + button + '</div>');
				$('.start-button').on('click', function(){
					i = 0;
					playGame();
				})
			}
		
			if (i < questions.length){
				theQuestion = questions[i];
				console.log(theQuestion);

				//start the timer
				timer.start();
				
				//posting the question details on the screen
				$('#info-area').html("<p>" + theQuestion.question + "</p>");
					
				for (var b = 0; b < theQuestion.answerchoices.length; b++){
					var a = $('<div>');
					a.removeClass();
					a.addClass('answers answers-button');
					a.attr('data-let', theQuestion.answerchoices[b]);
					a.text(theQuestion.answerchoices[b]);

					$('#ans-or-gif').append(a);
				}
				
				//if there is no response in 15 seconds, the game times out
				function unansweredNoti(){
					clearDivs();
					$('#timer').html("<p>Try to pick an answer faster next time!</p>");
					unanswered++; // number of unaswered goes up
					showAnswers();
					stopCounting();
					setTimeout(playGame, 5000);
				}
				setTimeout(unansweredNoti, 15000);

				// if and when the player chooses an answer from the list
				$('.answers').on('click', function(){
					var chosen = $(this).data('let');
					console.log(chosen);

					answerSelected = true;
					clearTimeout(unansweredNoti);

					if (chosen === theQuestion.rightAnswer){
						console.log("You are right!!!");
						clearDivs();
						rightNoti();
						showAnswers();
						stopCounting();
						setTimeout(playGame, 5000);
					}

					else if (chosen !== theQuestion.rightAnswer){
						console.log("Man are you wrong!");
						clearDivs();
						wrongNoti();
						showAnswers();
						stopCounting();
						setTimeout(playGame, 5000);
						
					}
				})


			}		

		}

		playGame();


	})

}

playGameGlobal();
			
})
