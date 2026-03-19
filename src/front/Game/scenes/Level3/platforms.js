const FlipTecho = (techo) =>{
techo.flipX= true
return techo
}

function createTejado(game, x, y) {
  const techo = game.tejado.create(x, y, 'techos').setOrigin(0, 0).refreshBody()
  return techo
}

function createCaja(game, x, y) {
  const caja = game.box.create(x, y, 'caja').setOrigin(0, 0).refreshBody().setScale(0.2)
  return caja
}

function createPez(game, x, y){
  const pez = game.peces.create(x ,y , 'pez').setOrigin(0, 0).setScale(0.079).refreshBody()
  return pez
}

export function createPlatforms(game) {
  game.tejado = game.physics.add.staticGroup()
  game.box = game.physics.add.staticGroup()
  game.peces = game.physics.add.staticGroup()
  // tejado izquierdo
  createTejado(game, 100, game.scale.height - 150)
  createTejado(game, 100, game.scale.height - 600)
  createTejado(game, 100, game.scale.height - 1150)
  createTejado(game, 100, game.scale.height - 1710)
  createTejado(game, 100, game.scale.height - 2220)
  createTejado(game, 100, game.scale.height - 2620)

  // tejado derecho
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 400, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 860, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 1530, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 1966, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 2436, 'techos').setOrigin(0, 0).refreshBody())
  

  // izquierdo
  createCaja(game, 400, game.scale.height - 280, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 440, game.scale.height - 700, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 400, game.scale.height - 1030, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 250, game.scale.height - 1300, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 257, game.scale.height - 1580, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 400, game.scale.height - 2100, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 135, game.scale.height - 2655, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 380, game.scale.height - 2835, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  
  // derecho
  createCaja(game, 400, game.scale.height - 550, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 620, game.scale.height - 1570, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 480, game.scale.height - 1400, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 420, game.scale.height - 1830, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 420, game.scale.height - 2300, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 420, game.scale.height - 2540, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 420, game.scale.height - 2832, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  
  //pez derecha
  createPez(game, 638, game.scale.height - 1100)
  createPez(game, 638, game.scale.height - 2700)
  createPez(game, 620, game.scale.height - 290)
  //pez izquierda
  createPez(game, 120, game.scale.height - 1500)
  createPez(game, 120, game.scale.height - 2550)
}