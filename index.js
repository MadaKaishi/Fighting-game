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
    },
    imageSrc: './img/samuraiMack/Idle.png',
    scale: 2.5, framesMax: 8, offset: {x:215,y:157},
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 0
        },
        width: 150,
        height: 120
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
    offset: {x:-100, y:0},
    imageSrc: './img/kenji/Idle.png',
    scale: 2.5, framesMax: 4, offset: {x:215,y:167},
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        }
    },
    attackBox: {
        offset: {
            x: -150,
            y: 25
        },
        width: 140,
        height: 100
    }

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

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    //player movement and animation
    player.velocity.x = 0

    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }

    //player jump animation
    if (player.velocity.y < 0 ) {
        player.switchSprite('jump')
    }
    else if (player.velocity.y > 0 ) {
        player.switchSprite('fall')
    }


    //enemy movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }

    //enemy jump animation
    if (enemy.velocity.y < 0 ) {
        enemy.switchSprite('jump')
    }
    else if (enemy.velocity.y > 0 ) {
        enemy.switchSprite('fall')
    }

    //detect for collision
    if (rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking  && player.frameCurrent === 4)
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