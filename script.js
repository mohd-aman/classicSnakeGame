let gameContainer = document.querySelector('.game-container');
let foodX,foodY;
let velocityX = 0, velocityY = 0;
let headX = 12, headY = 12;
let snakeBody = [];

function generateFood(){
    foodX = Math.floor(Math.random()*25)+1;
    foodY = Math.floor(Math.random()*25)+1;
    for(let i=0;i<snakeBody.length;i++){
        if(foodX == snakeBody[i][0] && foodY == snakeBody[i][1]){
            generateFood();
        }
    }
}

function gameOver(){
    alert("Game Hogya Over!!! ");
    velocityX = 0;
    velocityY = 0;
    headX = 12;
    headY = 12;
    snakeBody = [];
    generateFood();
}

snakeBody = [], [[12,14],[12,15],[12,16]]

function renderGame(){
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`
    if(headX == foodX && headY == foodY){
        generateFood();
        snakeBody.push([foodX,foodY]);
    }
    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);
    if(headX == 0 || headY == 0 || headX == 26 || headY == 26){
       gameOver();
        return;
    }
    for(let i=1;i<snakeBody.length;i++){
        if(headX == snakeBody[i][0] && headY == snakeBody[i][1]){
            gameOver();
            return;
        }
    }
    for(let i=0;i<snakeBody.length;i++){
        updatedGame += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`    
    }
    
    gameContainer.innerHTML = updatedGame;
}

generateFood();
renderGame();
setInterval(renderGame, 100);


document.addEventListener('keydown',function(e){
    console.log(e);
    let keyPressed = e.key;
    if(keyPressed == 'ArrowUp' && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }else if(keyPressed == 'ArrowDown' && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(keyPressed == 'ArrowLeft' && velocityX!=1){
        velocityY = 0;
        velocityX = -1;
    }else if(keyPressed == 'ArrowRight' && velocityX!=-1){
        velocityY = 0;
        velocityX = 1;
    }
})