const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.5

const background = new Sprite({
    position: {x:0, y:0},
    imageSrc: './img/background.png'
})


const player = new Fighter({
    position: {
    x:0,
    y:0
    },
    velocity: {
    x:0,
    y:0
    },
    offset: {
        x: 0,
        y: 0
    }
})

const enemy = new Fighter({
    position: {
    x:400,
    y:100
    },
    velocity: {
    x:0,
    y:0
    },
    color: 'green',
    offset: {x:-100, y:0}
})


console.log(player)

const keys = {
    a : {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight : {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function rectangularCollision({rectangle1, rectangle2}){
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >=  rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

let timeNonStop = true

function determineWinner({player, enemy, timerId})
{
    clearTimeout(timerId)
    timeNonStop = false
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health == enemy.health)
    {
        document.querySelector('#displayText').innerHTML = 'Tie'

    }
    else if (player.health > enemy.health)
    {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    }

    else if (player.health < enemy.health)
    {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 60
let timerID


function decreaseTimer() {
    if (timer > 0 && timeNonStop ) {
    timerID = setTimeout(decreaseTimer,1000)
    timer--
    document.querySelector('#timer').innerHTML = timer}

    if (timer == 0)
    {
        determineWinner({player: player,enemy: enemy, timerId: timerID})
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    player.update()
    enemy.update()

    //player movement
    player.velocity.x = 0
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4
    } if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
    }

    //enemy movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4
    } if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
    }

    //detect for collision
    if (rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking)
    {
        player.isAttacking = false
        console.log("Enemy hit")
        enemy.health -= 50
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
    if (rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking)
    {
        enemy.isAttacking = false
        console.log("Player hit")
        player.health -= 5
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0)
    {
        determineWinner({player, enemy, timerID})
    }
}

animate()

window.addEventListener('keydown',(event) => {
    switch(event.key){
        case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w':
        if (player.position.y > canvas.height-160){
            player.velocity.y = -15}
        break
        case ' ':
            player.attack()
        break


        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = "ArrowRight"
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = "ArrowLeft"
        break
        case 'ArrowUp':
        if (enemy.position.y > canvas.height-160){
        enemy.velocity.y = -15}
        break
        case 'ArrowDown':
        enemy.attack()
        break
    }
console.log(event.key)
})

window.addEventListener('keyup',(event) => {
    switch(event.key){
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
console.log(event.key)
})