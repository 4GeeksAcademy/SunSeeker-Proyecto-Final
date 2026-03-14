export function Animaciones(Game) {
  Game.anims.create({
    key: "left",
    frames: Game.anims.generateFrameNumbers("GatoNaranjaF", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  Game.anims.create({
    key: "turn",
    frames: [{ key: "GatoNaranjaF", frame: 5 }],
    frameRate: 10,
    repeat: -1,
  });

  Game.anims.create({
    key: "Muerte",
    frames: [{ key: "GatoNaranjaF", frame: 6 }],
    frameRate: 10,
    repeat: -1,
  });

  /// Gato azul
  //  Game.anims.create({
  //   key: "azulLeft",
  //   frames: Game.anims.generateFrameNumbers("GatoAzul", {
  //     start: 0,
  //     end: 1,
  //   }),
  //   frameRate: 10,
  //   repeat: -1,
  // });

  //  Game.anims.create({
  //   key: "azulTurn",
  //   frames: [{ key: "GatoAzul", frame: 3 }],
  //   frameRate: 10,
  //   repeat: -1,
  // });

  Game.anims.create({
      key: 'Perrito',
      frames: Game.anims.generateFrameNumbers('Perrito', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1,
  });
}
