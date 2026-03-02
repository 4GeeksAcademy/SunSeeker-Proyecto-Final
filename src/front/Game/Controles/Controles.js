

export function Controles(Game){

     var cursors = Game.input.keyboard.createCursorKeys();

            if (cursors.left.isDown) {
                Game.GatoNar.setVelocityX(-160);
                Game.GatoNar.setFlipX(false)
                Game.GatoNar.anims.play('left', true)
            } else if (cursors.right.isDown) {
                Game.GatoNar.setVelocityX(160);
                Game.GatoNar.anims.play('left', true)
                Game.GatoNar.setFlipX(true)
            } else {
                Game.GatoNar.setVelocityX(0);
                Game.GatoNar.anims.play('turn', true)
            }

            if (cursors.up.isDown && Game.GatoNar.body.touching.down) {
                Game.GatoNar.setVelocityY(-300);

            }
              if (Game.Perrito.body.velocity.x < 0) {
                Game.Perrito.setFlipX(false); 
                Game.Perrito.anims.play('leftPerro', true)
             } else if (Game.Perrito.body.velocity.x > 0) {
                Game.Perrito.setFlipX(true); 
            }

        }
