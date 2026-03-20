import { Game } from "phaser";

export function createPlayer(game) {
  // game.GatoNar = game.physics.add
  //   .sprite(400, 0, "gato")
  //   .setOrigin(0, 0)
  //   .setCollideWorldBounds(true)
  //   .setGravityY(300);
  
  // game.Score =  game.previousScore ?? 0;
  // game.ScoreText = game.add.text(25, 16, "Score: 0", {
  //     fontSize: "32px",
  //     fill: "#000",
  //   });
  //   game.ScoreText.setScrollFactor(0);
  game.keys = game.input.keyboard.createCursorKeys();

    //     const colorMap = {
    //   Naranja: 1, Blanco: 2, Negro: 3,
    //   BlancoGafas: 4, NegroGafas: 5, NaranjaGafas: 6,
    //   NaranjaSombrero: 7, BlancoSombrero: 8, NegroSombrero: 9,
    // };
    // game.gatoColor = colorMap[localStorage.getItem("michi_color")] ?? 1;

  const colorBase = localStorage.getItem("michi_color") || "Naranja";
  const accesorioBase = localStorage.getItem("michi_accesorio") || "";
  const claveCompleta = accesorioBase
    ? `${colorBase}${accesorioBase}`
    : colorBase;

  const colorMap = {
    Naranja: 1,
    Blanco: 2,
    Negro: 3,
    BlancoGafas: 4,
    NegroGafas: 5,
    NaranjaGafas: 6,
    NaranjaSombrero: 7,
    BlancoSombrero: 8,
    NegroSombrero: 9,
  };
  game.gatoColor = colorMap[claveCompleta] ?? 1;

    game.texturaGato =
      game.gatoColor === 2
        ? "GatoBlanco"
        : game.gatoColor === 3
          ? "GatoNegro"
          : game.gatoColor === 4
            ? "GatoBlancoGafas"
            : game.gatoColor === 5
              ? "GatoNegroGafas"
              : game.gatoColor === 6
                ? "GatoNaranjaGafas"
                : game.gatoColor === 7
                  ? "GatoNaranjaSombrero"
                  : game.gatoColor === 8
                    ? "GatoBlancoSombrero"
                    : game.gatoColor === 9
                      ? "GatoNegroSombrero"
                      : "GatoNaranjaF";
 
    game.sufijo =
      game.gatoColor === 2
        ? "Blanco"
        : game.gatoColor === 3
          ? "Negro"
          : game.gatoColor === 4
            ? "BlancoGafas"
            : game.gatoColor === 5
              ? "NegroGafas"
              : game.gatoColor === 6
                ? "NaranjaGafas"
                : game.gatoColor === 7
                  ? "NaranjaSombrero"
                  : game.gatoColor === 8
                    ? "BlancoSombrero"
                    : game.gatoColor === 9
                      ? "NegroSombrero"
                      : "Naranja";
 
    game.escala =
      game.gatoColor === 2
        ? 0.9
        : game.gatoColor === 3
          ? 1.1
          : game.gatoColor === 4
            ? 0.9
            : game.gatoColor === 5
              ? 1.1
              : game.gatoColor === 6
                ? 1.6
                : game.gatoColor === 7
                  ? 1.6
                  : game.gatoColor === 8
                    ? 0.9
                    : game.gatoColor === 9
                      ? 1.1
                      : 1.6;

      game.GatoNar = game.physics.add
      .sprite(400, 600, game.texturaGato)
      .setScale(game.escala)
      .setOrigin(0, 0)
      .setCollideWorldBounds(true)
      .setGravityY(-200);
      
      
}

export function createColliders(game) {
  game.physics.add.collider(game.GatoNar, game.floor);
  game.physics.add.collider(game.GatoNar, game.tejado);
  game.physics.add.collider(game.GatoNar, game.box);
//   game.physics.add.overlap(game.GatoNar, game.peces, (GatoNar, item) => {
//   if (item.texture.key === 'pez') {
//     addToScore(25, item, game)
//     game.Score += 25
//     game.Score.setText("Score: " + game.Score)
//     item.destroy()
//   }
// })
  game.physics.add.overlap(game.GatoNar, game.finish, ()=>{end(game)} , null, this)
  game.perritos.forEach(perrito => {
  game.physics.add.overlap(game.GatoNar, perrito, ()=>{onHitEnemy(game)})
  })
}

export function GatoNarDeath(GatoNar, game){
    if (GatoNar.isDead) return;
    GatoNar.isDead = true
    GatoNar.anims.play('Muerte_' + game.sufijo, true)
    GatoNar.setCollideWorldBounds(false)
    GatoNar.setVelocityX(0)
    GatoNar.body.checkCollision.none = true
    setTimeout(() => {
        GatoNar.setVelocityY(-600)
    }, 100)
}

export function onHitEnemy (game){
    GatoNarDeath(game.GatoNar, game)
    setTimeout(() => {
      game.scene.start("endScene", { score: game.GatoNar.Score })
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

function end(game) {
  game.scene.start("endScene", { score: game.GatoNar.Score });
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

//   game[`pepino${id}Collider`] = game.physics.add.collider(game[key], game.GatoNar)
//   game[`pepino${id}Overlap`] = game.physics.add.overlap(game.GatoNar, game[key], onHitEnemy)
//   game.physics.add.overlap(game.GatoNar, game[key], onHitEnemy)
// }

function spawnPerrito(game, x , y, flip){
  game.perrito = game.physics.add.sprite(x, y, 'Perrito').setOrigin(0, 0).setScale(0.4).setGravityY(-1000).setVelocityX(flip ? 180 : -135) 
  game.perrito.anims.play('Perrito')
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