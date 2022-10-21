var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  console.log(randomNumber);
  console.log(randomChosenColour);
  console.log(gamePattern);
}

$(document).keypress(function(event) {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").click(function(event) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(event) {
        nextSequence();
      }, 750);
    }
  }
    else {
      playSound("wrong");
      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function(event) {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key To Restart");
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
  }
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(event) {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
