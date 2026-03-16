const FlipTecho = (techo) =>{
techo.flipX= true
return techo
}

function createTejado(game, x, y) {
  const techo = game.tejado.create(x, y, 'techos').setOrigin(0, 0).refreshBody()
  return techo
}

function createCaja(game, x, y) {
  const caja = game.box.create(x, y, 'caja').setOrigin(0, 0).refreshBody()
  return caja
}

export function createPlatforms(game) {
  game.tejado = game.physics.add.staticGroup()
  game.box = game.physics.add.staticGroup()
  // tejado izquierdo
  createTejado(game, 100, game.scale.height - 150)
  createTejado(game, 100, game.scale.height - 620)
  createTejado(game, 100, game.scale.height - 1150)
  createTejado(game, 100, game.scale.height - 1710)

  // tejado derecho
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 400, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 860, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 1530, 'techos').setOrigin(0, 0).refreshBody())
  FlipTecho(game.tejado.create(game.scale.width - 205, game.scale.height - 1966, 'techos').setOrigin(0, 0).refreshBody())

  // izquierdo
  createCaja(game, 400, game.scale.height - 280, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 400, game.scale.height - 730, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 400, game.scale.height - 1030, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 200, game.scale.height - 1280, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 257, game.scale.height - 1580, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  
  // derecho
  createCaja(game, 460, game.scale.height - 530, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 620, game.scale.height - 900, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 480, game.scale.height - 1400, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  createCaja(game, 420, game.scale.height - 1830, 'caja').setOrigin(0, 0).setScale(0.2).refreshBody()
  
}