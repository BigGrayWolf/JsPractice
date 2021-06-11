import {getInputDirection} from './input.js'
export const SNAKE_SPEED = 5; //set the speed of snake
let newSegments = 0;

const snakeBody = [
    {x : 11, y : 11}
];

export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

export function onSnake(posiotion) {
    return snakeBody.some(segment => {
        return equalPositions(segment, posiotion);
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function getSnakeHead() {
    return {...snakeBody[0]};
}

export function snakeIntersection() {
    let head = getSnakeHead();
    for(let i = 1; i < snakeBody.length; i++) {
        if(equalPositions(head, snakeBody[i]))
            return true;
    }
    return false;
}

function equalPositions(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
} 

function addSegments() {
    for(let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newSegments = 0;
}