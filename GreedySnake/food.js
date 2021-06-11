import {onSnake, expandSnake} from './snake.js'
import {randGridPosition} from './grid.js'

let food = getRandFoodPosition();
const EXPANDSION_RATE = 1; //how much to grow when eat food

export function update() {
    if(onSnake(food)) {
        expandSnake(EXPANDSION_RATE);
        food = getRandFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandFoodPosition() {
    let newFoodPosition = null;
    while(newFoodPosition == null || onSnake(newFoodPosition))
        newFoodPosition = randGridPosition();
    return newFoodPosition;
}