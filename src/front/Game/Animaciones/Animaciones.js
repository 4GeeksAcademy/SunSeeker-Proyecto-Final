export function Animaciones(Game) {
  const tipos = [
    { key: "Naranja", texture: "GatoNaranjaF", frameStop: 5 },
    { key: "Blanco", texture: "GatoBlanco", frameStop: 5 },
    { key: "Negro", texture: "GatoNegro", frameStop: 5 },
    { key: "BlancoGafas", texture: "GatoBlancoGafas", frameStop: 5 },
    { key: "NegroGafas", texture: "GatoNegroGafas", frameStop: 5 },
    { key: "NaranjaGafas", texture: "GatoNaranjaGafas", frameStop: 5 },
  ];

  tipos.forEach((gato) => {
    if (!Game.anims.exists("left_" + gato.key)) {
      Game.anims.create({
        key: "left_" + gato.key,
        frames: Game.anims.generateFrameNumbers(gato.texture, {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      Game.anims.create({
        key: "turn_" + gato.key,
        frames: [{ key: gato.texture, frame: gato.frameStop }],
        frameRate: 10,
      });

      Game.anims.create({
        key: "Muerte_" + gato.key,
        frames: [{ key: gato.texture, frame: 6 }],
        frameRate: 10,
      });
       Game.anims.create({
        key: "jump_" + gato.key,
        frames: [{ key: gato.texture, frame: 4 }],
        frameRate: 10,
      });
    }
  });

  // Animación del perrito
  if (!Game.anims.exists("Perrito")) {
    Game.anims.create({
      key: "Perrito",
      frames: Game.anims.generateFrameNumbers("Perrito", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
