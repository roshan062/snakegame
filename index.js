// Snake Game Constants & Variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/bg-music3.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 5, y: 5 }];
let food = { x: 11, y: 13 };
let score = 0;
let hiscoreval = 0;

// Game Functions
// Main Function Creating game Loop
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    // console.log(ctime);
    lastPaintTime = ctime;
    gameEngine();
}

// Collision Function (When to Collide the snake)
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }

    if (snakeArr[0].x < 1 || snakeArr[0].x > 23 || snakeArr[0].y < 1 || snakeArr[0].y > 18) {
        return true;
    }

    return false;
}










// Game Engine Function called in main function (in game loop) 
function gameEngine() {

    // Display the Snake & Food
    // Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        var snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Displaying Food 
    var foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


    //  Restart the Game after Collision of Snake
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        musicSound.pause();
        alert("Game Over. Press Enter to start again.");
        snakeArr = [{ x: 5, y: 5 }];
        score = 0;
        scoreNumber.innerHTML = "Score : " + score;
    }


    // If Snake ate the Food, Increase Snake body segment and regenerate the Food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        foodSound.play();
        foodSound.volume = .5;

        let a = 3;
        let b = 16;
        let c = 21;  //  Third variable created because rows and columns are not equal in grid  
        food = { x: Math.round(Math.random() * (c - a) + a), y: Math.round(Math.random() * (b - a) + a) };

        score += 1;
        scoreNumber.innerHTML = "Score : " + score;

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreNumber.innerHTML = "Hi-Score : " + hiscoreval;
            
        }
    }


    // Code for Moving the Snake 
    for (var i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    musicSound.play();
    musicSound.volume = .5;

}


// Game execution starts from here and call main function which creates a  game loop
window.requestAnimationFrame(main);

// Event Listener to Change Direction A/c to Pressed Arrow Keys 
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    moveSound.volume = .8;
    switch (e.key) {
        case 'ArrowUp':
            console.log("Arrow Up");
            inputDir = { x: 0, y: -1 };
            // inputDir.x = 0;
            // inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log("Arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log("Arrow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log("Arrow Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})

document.querySelector("#up").addEventListener('click', function(){
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    moveSound.volume = .8;
    inputDir = { x: 0, y: -1 };
})

document.querySelector("#left").addEventListener('click', function(){
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    moveSound.volume = .8;
    inputDir.x = -1;
    inputDir  .y = 0;
})

document.querySelector("#right").addEventListener('click', function(){
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    moveSound.volume = .8;
    inputDir.x = 1;
    inputDir.y = 0;
})

document.querySelector("#down").addEventListener('click', function(){
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    moveSound.volume = .8;
    inputDir.x = 0;
    inputDir.y = 1;
})



// Setting Value of Hi-Score in local storage

// let hiscore = localStorage.getItem("hiScore");
// if (hiscore === null) {
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
// }

// else {
//     hiscoreval = JSON.parse(hiscore);
//     hiScoreNumber.innerHTML = "Hi-Score : " + hiscoreval;
// }

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiScoreNumber.innerHTML = "Hi-Score : " + hiscoreval;
}







