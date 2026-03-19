const createSuperWall = (game, x, y, a) => {
 const pared = game.walls.create(x, y, a ? 'pared-izq' : 'pared-der').setOrigin(0, 0).refreshBody()
 return pared
}
const FlipCielo = (cielo) =>{
cielo.flipY= true
return cielo
}


export const createWalls = (game) =>{
game.walls = game.physics.add.staticGroup()

  // pared izquierda
  createSuperWall(game, -50, game.scale.height - 395, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 750, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 1100, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 1455, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 1810, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 2170, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 2530, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 2890, game).setOrigin(0, 0).refreshBody()
  createSuperWall(game, -50, game.scale.height - 3258, game).setOrigin(0, 0).refreshBody()

  //pared derecha
  createSuperWall(game, game.scale.width - 135, game.scale.height - 395).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 750).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 1100).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 1455).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 1810).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 2170).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 2530).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 2890).setOrigin(0, 0).refreshBody()
  createSuperWall(game, game.scale.width - 135, game.scale.height - 3260).setOrigin(0, 0).refreshBody()


  game.puerta = game.add.image(404, -2145, 'puerta').setOrigin(0, 0).setScale(0.25)
  game.finish = game.add.zone(440, -2060, 80, 100);
  game.physics.add.existing(game.finish, true);

  game.backWall = game.add.image(148, 437, 'paredFond').setOrigin(0, 0).setScale(1.16)
  game.sky= game.add.image(150,-1000, 'cielo').setOrigin(0, 0).setScale(1).setDepth(-1)
  FlipCielo(game.add.image(150, -2800, 'cielo').setOrigin(0, 0).setScale(1).setDepth(-1))
  
  game.floor = game.physics.add.staticGroup()
  game.floor.create(game.scale.width -856, game.scale.height-30, 'suelo').setOrigin(0,0).setScale(1.37).refreshBody()
}