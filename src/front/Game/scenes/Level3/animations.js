export const createAnimations = (game) => {
  // Animaciones gato
  game.anims.create({
    key: "gato-walk",
    frames: game.anims.generateFrameNumbers("gato", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: "gato-jump",
    frames: [{ key: "gato", frame: 4 }],
  });

  game.anims.create({
    key: "gato-idle",
    frames: [{ key: "gato", frame: 5 }],
  });

  game.anims.create({
    key: "gato-death",
    frames: [{ key: "gato", frame: 6 }],
  });

  // animaciones pepino

  game.anims.create({
    key: "pepino-walk",
    frames: game.anims.generateFrameNumbers("pepino", { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1,
  });

  //  animaciones perrito

  game.anims.create({
    key: "perrito",
    frames: game.anims.generateFrameNumbers("perrito", { start: 0, end: 1 }),
    frameRate: 1,
    repeat: -1,
  });
};
