export function Controles(Game) {
    var cursors = Game.input.keyboard.createCursorKeys();
    
    let sufijo =
  Game.gatoColor === 2
    ? "Blanco"
    : Game.gatoColor === 3
      ? "Negro"
      : Game.gatoColor === 4
        ? "BlancoGafas"
        : Game.gatoColor === 5
        ? "NegroGafas"
        : Game.gatoColor === 6
        ? "NaranjaGafas"
        : "Naranja";

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
   if (Game.Perrito && Game.Perrito.body) {
    if (Game.Perrito.body.velocity.x !== 0) {
      Game.Perrito.setFlipX(Game.Perrito.body.velocity.x > 0);
      Game.Perrito.anims.play("Perrito", true);
    }
  }

  if (Game.PerritoCallejon && Game.PerritoCallejon.body) {
    if (Game.PerritoCallejon.body.velocity.x !== 0) {
      Game.PerritoCallejon.setFlipX(Game.PerritoCallejon.body.velocity.x > 0);
      Game.PerritoCallejon.anims.play("Perrito", true);
    }
  }
}



