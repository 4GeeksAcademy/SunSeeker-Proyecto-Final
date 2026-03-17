export function Controles(Game) {
  var cursors = Game.input.keyboard.createCursorKeys();

  // Determinamos el sufijo según el color
  let sufijo = Game.gatoColor === 2 ? "Blanco" : "Naranja";

  if (cursors.left.isDown) {
    Game.GatoNar.setVelocityX(-160);
    Game.GatoNar.setFlipX(false);
    Game.GatoNar.anims.play("left_" + sufijo, true);
  } else if (cursors.right.isDown) {
    Game.GatoNar.setVelocityX(160);
    Game.GatoNar.setFlipX(true);
    Game.GatoNar.anims.play("left_" + sufijo, true);
  } else {
    Game.GatoNar.setVelocityX(0);
    Game.GatoNar.anims.play("turn_" + sufijo, true);
  }

  if (cursors.up.isDown && Game.GatoNar.body.touching.down) {
    Game.GatoNar.setVelocityY(-550);
  }

  // Lógica del Perrito
  // if (Game.Perrito.body.velocity.x !== 0) {
  //     Game.Perrito.setFlipX(Game.Perrito.body.velocity.x > 0);
  //     Game.Perrito.anims.play('Perrito', true);
  // }
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



