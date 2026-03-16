export function createPlayer(game) {
  game.gato = game.physics.add
    .sprite(145, -1710, "gato")
    .setOrigin(0, 0)
    .setCollideWorldBounds(true)
    .setGravityY(300);
  game.keys = game.input.keyboard.createCursorKeys();
}
// altura suelo 637 y x 400
export function createColliders(game) {
  game.physics.add.collider(game.gato, game.walls);
  game.physics.add.collider(game.gato, game.floor);
  game.physics.add.collider(game.gato, game.tejado);
  game.physics.add.collider(game.gato, game.box);
  game.physics.add.collider(game.pepino, game.box);
}

function gatoDeath(game){
    if (game.gato.isDead) return;
    game.gato.isDead = true
    game.gato.anims.play('gato-death', true)
    game.gato.setCollideWorldBounds(false)
    game.gato.setVelocityX(0)
    game.gato.body.checkCollision.none = true

    setTimeout(() => {
        game.gato.setVelocityY(-300)
    }, 100)
}

export function onHitEnemy (game){
  if(game.gato.body.touching && game.pepino.body.touching){
    gatoDeath(game)
  }else{
    return
  }
}

export function createEnemies(game) {
  game.pepino = game.physics.add
    .sprite(400, -400, "pepino")
    .setOrigin(0, 0)
    .setScale(0.3)
    .setGravityY(300)
    .setVelocityX(0);
  // game.perrito = game.physics.add.sprite()
  game.pepino.estado = "top";
  game.pepino.setCollideWorldBounds(false)
  game.pepino.anims.play("pepino-walk");
}

export function updateEnemies(game) {
  const pepino = game.pepino
  const caja = game.box.getChildren()[0]
  const speed = 1.5  

  const izq = caja.x
  const der = caja.x + caja.displayWidth
  const top = caja.y
  const bot = caja.y + caja.displayHeight

  switch (pepino.estado) {

    case 'top':
      pepino.body.reset(pepino.x + speed, top)
      if (pepino.x >= der) {
        pepino.estado = 'right'
        pepino.setPosition(der, top)
      }
      break

    case 'right':
      pepino.body.reset(pepino.x, pepino.y + speed)
      if (pepino.y >= bot) {
        pepino.estado = 'bottom'
        pepino.setPosition(der, bot)
      }
      break

    case 'bottom':
      pepino.body.reset(pepino.x - speed, pepino.y)
      if (pepino.x <= izq) {
        pepino.estado = 'left'
        pepino.setPosition(izq, bot)
      }
      break

    case 'left':
      pepino.body.reset(pepino.x, pepino.y - speed)
      if (pepino.y <= top) {
        pepino.estado = 'top'
        pepino.setPosition(izq, top)
      }
      break
  }
}
