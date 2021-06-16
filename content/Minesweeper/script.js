const BOARD_SIZE = 10
const MINES = 10

const TITLE_STATUS = {
    HIDDEN : 'hidden',
    MINE : 'mine',
    NUMBER : 'number',
    MARKED : 'marked',
    BLANK : 'blank',
    //debug
    INQUEUE: 'inqueue',
    CURDIV: 'curdiv',
}

const minesCheckPositioins = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
]

document.documentElement.style.setProperty(`--size`, BOARD_SIZE)

const minesElement = document.querySelector('#mines')
const boardElement = document.querySelector('.board')
const gameOverElement = document.querySelector('.game-over')
const restartBtn = document.querySelector('#restart')

minesElement.innerHTML = MINES
let minesLeft = MINES

board = createBoard(boardElement, BOARD_SIZE)
mines = generateMines(MINES, board)
mines.forEach(element => { element.mine = true });
board.forEach(element => {
    element.div.addEventListener('click', e => {
        if(element.mine) {
            gameOver()
            return
        }
        let beside = getBeside(element)
        let mineBeside = getMinesBeside(beside)
        if(mineBeside != 0) {
            element.div.innerText = mineBeside
        } else {
            clearSpace(element)
        }
    })

    element.div.addEventListener('contextmenu', e => {
        e.preventDefault()
        if(minesLeft <= 0) return
        element.div.dataset.status = TITLE_STATUS.MARKED
        updataMines()
        if(minesLeft == 0) gameOver()
    })
})

restartBtn.addEventListener('click', e => {
    location.reload()
})

function createBoard(boardElement, sizeOfBaord) {
    const board = []
    for(let i = 0; i < sizeOfBaord * sizeOfBaord; i++) {
        const element = document.createElement('div')
        element.dataset.status = TITLE_STATUS.HIDDEN
        const index_x = i % 10
        const index_y = Math.floor(i / 10)
        board.push({
            x: index_x,
            y: index_y,
            index: i,
            div: element,
            mine: false,
        })

        boardElement.appendChild(element)
    }
    return board
}

function generateMines(numberOfMines, board) {
    const choosed = []
    const result = []
    for(let i = 0; i < numberOfMines; ) {
        const index = Math.floor(Math.random() * 100)
        if(choosed.includes(index)) continue
        result.push(board[index])
        i++
    }

    return result
}

function gameOver() {
    mines.forEach(element => {
        element.div.dataset.status = TITLE_STATUS.MINE
    })
    gameOverElement.style.display = 'flex'
}

function updataMines() {
    minesLeft -= 1
    minesElement.innerHTML = minesLeft
}

function getBeside(element) {
    let beside = []
    minesCheckPositioins.forEach(vector => {
        let x = element.x + vector[0]
        let y = element.y + vector[1]
        if(x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) return
        beside.push(board[y * 10 + x])
    })
    return beside
}

function getMinesBeside(beside) {
    let minesBeside = 0
    beside.forEach(element => {
        if(element.mine) minesBeside += 1
    })
    return minesBeside
}

function clearSpace(element) {
    let queue = [element]
    let mark = []
    for(let i = 0; i < BOARD_SIZE; i++) {
        mark.push([])
        for(let j = 0; j < BOARD_SIZE; j++)
            mark[i].push(0)
    }
    // BFS
    while(queue.length != 0) {
        let front = queue.shift();
        mark[front.y][front.x] = 1
        let beside = getBeside(front);
        let num = getMinesBeside(beside);
        if(num == 0) {
            front.div.dataset.status = TITLE_STATUS.BLANK
            beside.forEach(e => {
                if(mark[e.y][e.x] == 0 && !e.mine) {
                    queue.push(e)
                }
            })
        } else {
            front.div.dataset.status = TITLE_STATUS.NUMBER
            front.div.innerText = num;
        }
    }

}