class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, framesHold = 1}) {
        this.position  = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
    }

    draw() {
        c.drawImage(this.image,
                this.frameCurrent *(this.image.width / this.framesMax),
                0,
                this.image.width /this.framesMax,
                this.image.height,
                    this.position.x,
                    this.position.y,
                    this.image.width /this.framesMax * this.scale,
                    this.image.height * this.scale)
            }

    update() {
        this.draw()
        this.framesElapsed ++

        if (this.framesElapsed % this.framesHold === 0){
            if (this.frameCurrent < this.framesMax - 1){
                this.frameCurrent ++
            }
            else
            {
                this.frameCurrent = 0
            }
        }
    }
}

class Fighter {
    constructor({position,velocity,color = 'red',offset}) {
        this.position  = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {position: {x: this.position.x, y: this.position.y}, offset, width: 150 ,height: 50}
        this.color = color
        this.isAttacking = false
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        //attack box
        if (this.isAttacking == true){
        c.fillStyle = 'blue'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
        this.velocity.y = 0
        //this.position.y = canvas.height
    }
    else this.velocity.y += gravity;

    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        },100)
    }
}