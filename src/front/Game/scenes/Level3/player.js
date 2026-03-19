export function createPlayer(game) {
  game.gato = game.physics.add
    .sprite(400, 0, "gato")
    .setOrigin(0, 0)
    .setCollideWorldBounds(true)
    .setGravityY(300);
  
  game.Score = 0;
  game.scoreText = game.add.text(16, 16, "Score: 0", { 
    fontFamily: 'Courier New', 
    fontSize: '24px',
    color: '#ffffff'
  }).setScrollFactor(0)
  game.keys = game.input.keyboard.createCursorKeys();
}

export function createColliders(game) {
  game.physics.add.collider(game.gato, game.floor);
  game.physics.add.collider(game.gato, game.tejado);
  game.physics.add.collider(game.gato, game.box);
  game.physics.add.overlap(game.gato, game.peces, (gato, item) => {
  if (item.texture.key === 'pez') {
    addToScore(25, item, game)
    game.Score += 25
    game.scoreText.setText("Score: " + game.Score)
    item.destroy()
  }
})
  game.physics.add.overlap(game.gato, game.finish, ()=>{end(game)} , null, this)
  game.perritos.forEach(perrito => {
  game.physics.add.overlap(game.gato, perrito, ()=>{onHitEnemy(game)})
  })
}

function gatoDeath(gato){
    if (gato.isDead) return;
    gato.isDead = true
    gato.anims.play('gato-death', true)
    gato.setCollideWorldBounds(false)
    gato.setVelocityX(0)
    gato.body.checkCollision.none = true
    setTimeout(() => {
        gato.setVelocityY(-600)
    }, 100)
}

export function onHitEnemy (game){
    gatoDeath(game.gato)
    setTimeout(() => {
      game.scene.start("endScene", { score: game.Score })
    }, 2000)
    
}
function addToScore(scoreToAdd, origin, game) {
    const scoreText = game.add.text(origin.x, origin.y, scoreToAdd, { 
        fontFamily: 'Courier New', 
        fontSize: game.scale.width / 40 
    })
    game.tweens.add({
        targets: scoreText,
        duration: 500,
        y: scoreText.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration: 100,
                alpha: 0,
                onComplete: () => scoreText.destroy()
            })
        }
    })
}

function end(game){
game.scene.start("endScene", { score: game.Score })
}

// function spawnPepino(game, x, y, estado, caja, id) {
//   const key = `pepino${id}`
//   if (game[key]) game[key].destroy()

//   game[key] = game.physics.add.sprite(x, y, 'pepino')
//     .setOrigin(0, 0)
//     .setScale(0.3)
//     .setGravityY(-1000)

//   game[key].estado = estado
//   game[key].viajes = 0
//   game[key].dir = 1
//   game[key].cajaRef = caja
//   game[key].id = id

//   game[key].anims.play('pepino-walk')

//   const w = game[key].displayWidth
//   const h = game[key].displayHeight

//   if (estado === 'right' || estado === 'left') {
//     game[key].body.setSize(h / game[key].scaleX, w / game[key].scaleY)
//   } else {
//     game[key].body.setSize(w / game[key].scaleX, h / game[key].scaleY)
//   }

//   game[`pepino${id}Collider`] = game.physics.add.collider(game[key], game.gato)
//   game[`pepino${id}Overlap`] = game.physics.add.overlap(game.gato, game[key], onHitEnemy)
//   game.physics.add.overlap(game.gato, game[key], onHitEnemy)
// }

function spawnPerrito(game, x , y, flip){
  game.perrito = game.physics.add.sprite(x, y, 'perrito').setOrigin(0, 0).setScale(0.14).setGravityY(-1000).setVelocityX(flip ? 180 : -135) 
  game.perrito.anims.play('perrito')
  if (flip) game.perrito.flipX = true

  game.perrito.respawnY = y
  game.perrito.respawnX = x

  const zonaX = flip ? game.scale.width + 1000 : -15
  game.zona = game.add.zone(zonaX, y, 20, 20);
  game.physics.add.existing(game.zona, true);
  
  game.physics.add.overlap(game.perrito, game.zona, (p) => {
    p.setPosition(p.respawnX, p.respawnY)
    .setVelocityX(flip ? 170 : -135)
  })

  return game.perrito
}

export function createEnemies(game) {
  //  const cajas = game.box.getChildren()
  // const pepinosCaja = [0] 

  // pepinosCaja.forEach((indiceCaja, i) => {
  //   const caja = cajas[indiceCaja]
  //   spawnPepino(game, caja.x, caja.y, 'top', caja, i)
  // })
  game.perritos = [spawnPerrito(game, 1000, -50),
    spawnPerrito(game, 1600, -450),
    spawnPerrito(game, -10, -280, game),
    spawnPerrito(game, 1800, -410),
    spawnPerrito(game, -500, -810, game),
    spawnPerrito(game, -10, -830, game),
    spawnPerrito(game, 1600, -1450),
    spawnPerrito(game, -10,  -1600, game)
    
  ]
}

// export function updateEnemies(game) {
//   const cajas = game.box.getChildren()

//   cajas.forEach((caja, i) => {
//     const pepino = game[`pepino${i}`]
//     if (!pepino || !pepino.active) return

//     updatePepino(game, pepino, caja, i)
//   })
// }

// function updatePepino(game, pepino, caja, id) {
//   const speed = 0.5

//   const izq = caja.x
//   const der = caja.x + caja.displayWidth
//   const top = caja.y
//   const bot = caja.y + caja.displayHeight

//   const pw = pepino.displayWidth
//   const ph = pepino.displayHeight

//   switch (pepino.estado) {
//     case 'top':
//       pepino.body.reset(pepino.x + speed * pepino.dir, top - ph)
//       if (pepino.x >= der) { pepino.dir = -1 }
//       else if (pepino.x <= izq) {
//         pepino.viajes++
//         if (pepino.viajes >= 2) spawnPepino(game, der, top, 'right', caja, id)
//         else pepino.dir = 1
//       }
//       break

//     case 'right':
//       pepino.body.reset(der, pepino.y + speed * pepino.dir)
//       if (pepino.y >= bot) { pepino.dir = -1 }
//       else if (pepino.y <= top) {
//         pepino.viajes++
//         if (pepino.viajes >= 2) spawnPepino(game, der, bot, 'bottom', caja, id)
//         else pepino.dir = 1
//       }
//       break

//     case 'bottom':
//       pepino.body.reset(pepino.x - speed * pepino.dir, bot)
//       if (pepino.x <= izq) { pepino.dir = -1 }
//       else if (pepino.x >= der) {
//         pepino.viajes++
//         if (pepino.viajes >= 2) spawnPepino(game, izq - pw, bot, 'left', caja, id)
//         else pepino.dir = 1
//       }
//       break

//     case 'left':
//       pepino.body.reset(izq - pw, pepino.y - speed * pepino.dir)
//       if (pepino.y <= top) { pepino.dir = -1 }
//       else if (pepino.y >= bot) {
//         pepino.viajes++
//         if (pepino.viajes >= 2) spawnPepino(game, izq, top - ph, 'top', caja, id)
//         else pepino.dir = 1
//       }
//       break
//   }
// }