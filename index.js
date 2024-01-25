var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$("#sbtn").on("click", function() {
    if (!gameStarted) { 
        $("h1").text("Level " + level);
        nextSequence(level);
        gameStarted = true;
        $("#sbtn").html("Start Over");
    } else {
        $("#sbtn").html("Start");
        $("h1").text("Press Start Key to Play");
        startOver();
    };
})

$(".mybtn").on("click", function() {      
    if (gameStarted) { 
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkanswer(userClickedPattern.length - 1);
    }
});

function nextSequence(level) {
    userClickedPattern = [];
    level ++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

// To animate a flash using vanilla javascript - Thanks to stackoverflow!
    $("#" + randomChosenColour).fadeTo(100, 0.3, function() { 
        $(this).fadeTo(500, 1.0);
    });
    playSound(randomChosenColour);
};

function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
};

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100);
}

function checkanswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(currentLevel + 1)
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Start Over to Play");
        startOver();
    }
}

function startOver(){
    gameStarted = false;
    gamePattern = [];
    level = 0;
}
