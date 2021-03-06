let botDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let defaultDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');

let turnCounter = 0;
let currentStreak = 0;
let bestStreak = 0;

function win () {
    document.getElementById('button').innerHTML = 'You win! Play again?'
    turnCounter = 0;
    currentStreak++;
    document.getElementById('currentStreakBox').innerHTML = currentStreak;
        
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        document.getElementById('bestStreakBox').innerHTML = bestStreak;
    }
};

function lose () {
    document.getElementById('button').innerHTML = 'Game over! Play again?'
    turnCounter = 0;
    currentStreak = 0;
    document.getElementById('currentStreakBox').innerHTML = currentStreak;
}

function doorPaths (param) {

    let randomFirstClick = Math.floor(Math.random() * 3); //prints 0, 1, or 2
    let randomSecondClick = Math.floor(Math.random() *2); //prints 0 or 1

    if (door1.src === botDoor || door2.src === botDoor || door3.src === botDoor) { //Checking if any robots to end game
        lose();
        return;
    } else if (param.src !== defaultDoor) { //Checking for clicking the same door twice
        return;
    } else if (turnCounter === 0) {  //For deciding what's behind door number one!
        if (randomFirstClick === 0) {
            lose();
            return param.src = botDoor;
        } else if (randomFirstClick === 1) {
            turnCounter++;
            return param.src = beachDoor;
        } else if (randomFirstClick === 2) {
            turnCounter++;
            return param.src = spaceDoor;
        } 
    } else if (turnCounter === 1) { // For deciding what's behind door number two!
        if (door1.src === spaceDoor || door2.src === spaceDoor || door3.src === spaceDoor) {
            if (randomSecondClick === 0) {
                turnCounter++;
                return param.src = beachDoor;
            } else {
                lose();
                return param.src = botDoor;
            }
        } else if (door1.src === beachDoor || door2.src === beachDoor || door3.src === beachDoor) {
            if (randomSecondClick === 0) {
                turnCounter++;
                return param.src = spaceDoor;
            } else {
                lose();
                return param.src = botDoor;
            }
        }        
    } else { // For deciding what's behind door number three - end of game
        param.src = botDoor;
        win();
        return;
    };     
};

function reset () {
    door1.src = defaultDoor;
    door2.src = defaultDoor;
    door3.src = defaultDoor;
    document.getElementById('button').innerHTML = 'Good luck!';
    return;
};
