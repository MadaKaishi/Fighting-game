const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.5
let timeNonStop = true

const background = new Sprite({
    position: {x:0, y:0},
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {x:620, y:127},
    imageSrc: './img/shop.png', scale: 2.75, framesMax: 6, framesHold: 10
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



decreaseTimer()

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
        if (player.position.y > canvas.height-260){
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
        if (enemy.position.y > canvas.height-260){
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