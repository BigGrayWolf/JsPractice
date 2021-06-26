

const listElement = $('#list')
const inputElement = $('#input')
const data = []
let id = 0


function $(name) {
    return document.querySelector(name)
}

const today = new Date()
$('#date').innerText = today.toLocaleString("en-US", 
    {weekday : "long", month:"short", day:"numeric"})

$('#clear').addEventListener('click', e => {
    listElement.innerHTML = ""
})

$("#list").addEventListener('click', e => {
    const item = e.target.parentNode
    const target = e.target
    if(target.dataset.job == "complete") {
        target.classList.toggle('fa-check-circle')
        target.classList.toggle('fa-circle')
        item.children[1].classList.toggle('lineThrough')
    } else {
        for(let li of item.children) {
            if(li.dataset.id == target.dataset.id) {
                item.remove(li)
                break
            }
        }
    }
})

document.addEventListener('keyup', e => {
    if(e.key == "Enter") {
        let todo = inputElement.value
        if(todo) {
            addItem(todo)
        }
        inputElement.value = ""
    }
})




function addItem(target) {
    const li = document.createElement('li')
    const icheck = document.createElement('i')
    const p = document.createElement('p')
    const itrash = document.createElement('i')
    
    li.classList.add('item')
    icheck.classList.add("far", "fa-circle")
    icheck.dataset.id = id
    icheck.dataset.job = "complete"
    p.classList.add("text")
    itrash.classList.add("far", "fa-trash-alt")
    itrash.dataset.id = id
    itrash.dataset.job = "delete"

    p.innerText = target

    li.appendChild(icheck)
    li.appendChild(p)
    li.appendChild(itrash)
    listElement.appendChild(li)

    id += 1
}


