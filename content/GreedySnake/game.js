import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
    if(gameOver) {
        if(confirm("Game Over!! Start again?")) {
            window.location = "./";
            gameOver = false;
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    checkDeath();
    updateFood();
    updateSnake();
}

function draw() {
    gameBoard.innerHTML = "";
    drawFood(gameBoard);
    drawSnake(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}