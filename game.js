var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green" ,"yellow"];
var level = 0;
var stopTrigger = false;
$(document).keypress(function(){
    if(!stopTrigger){        
        $("#level-title").text("Level "+level);
        nextSequence();
        stopTrigger = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        new Audio("./sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();        
    }
    
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level); 
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" +randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);  
     
}

function playSound(name){
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    stopTrigger = false;
}






