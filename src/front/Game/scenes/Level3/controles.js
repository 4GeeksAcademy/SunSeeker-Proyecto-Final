export const checkControls = (game) =>{
    
    
    if (game.keys.right.isDown) {
        game.gato.x += 2
        game.gato.body.touching.down && game.gato.anims.play('gato-walk', true)
        game.gato.flipX = true
    }else if (game.keys.left.isDown) {
        game.gato.x -= 2
        game.gato.body.touching.down && game.gato.anims.play('gato-walk', true)
        game.gato.flipX = false
    }else if (game.gato.body.touching.down){
        game.gato.anims.play('gato-idle', true)
    }else {
        game.gato.anims.play('gato-jump', true)
    }
    if (game.keys.up.isDown && game.gato.body.touching.down) {
        game.gato.anims.play('gato-jump', true)
        game.gato.setVelocityY(-600)
    }
}