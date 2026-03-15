export function Controles(Game) {
    var cursors = Game.input.keyboard.createCursorKeys();
    
    let sufijo = (Game.gatoColor === 2) ? "Blanco" : "Naranja";

    //movimientos
    if (cursors.left.isDown) {
        Game.GatoNar.setVelocityX(-160);
        Game.GatoNar.setFlipX(false);
    } else if (cursors.right.isDown) {
        Game.GatoNar.setVelocityX(160);
        Game.GatoNar.setFlipX(true);
    } else {
        Game.GatoNar.setVelocityX(0);
    }

    //animaciones de movimientos y salto
    if (cursors.up.isDown && Game.GatoNar.body.touching.down) {
        Game.GatoNar.setVelocityY(-550);
    }

    if (!Game.GatoNar.body.touching.down) {
        Game.GatoNar.anims.play("jump_" + sufijo, true);
    } else if (cursors.left.isDown || cursors.right.isDown) {
        Game.GatoNar.anims.play('left_' + sufijo, true);
    } else {
        Game.GatoNar.anims.play('turn_' + sufijo, true);
    }

    //Perrito
    if (Game.Perrito.body.velocity.x !== 0) {
        Game.Perrito.setFlipX(Game.Perrito.body.velocity.x > 0);
        Game.Perrito.anims.play('Perrito', true);
    }
}