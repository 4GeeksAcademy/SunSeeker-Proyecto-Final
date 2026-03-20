import { Animaciones } from "../Animaciones/Animaciones";

export default class Controles extends Phaser.Scene {
  constructor() {
    super("Controles");
  }

  preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");
    this.load.image("FlechaAtras", "img/FlechaAtras.png");
    this.load.image("ControlesHistoria", "img/ControlesHistoria.png");

    this.load.spritesheet("GatoNaranjaF", "img/GatoNaranja1.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet("GatoNaranjaGafas", "img/GatoNaranjaGafas.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet("GatoNaranjaSombrero", "img/GatoNaranjaSombrero.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet("GatoBlanco", "img/GatoBlanco.png", {
      frameWidth: 89,
      frameHeight: 58,
    });
    this.load.spritesheet("GatoBlancoGafas", "img/GatoBlancoGafas.png", {
      frameWidth: 89,
      frameHeight: 58,
    });
    this.load.spritesheet("GatoBlancoSombrero", "img/GatoBlancoSombrero.png", {
      frameWidth: 89,
      frameHeight: 58,
    });
    this.load.spritesheet("GatoNegro", "img/GatoNegroSF.png", {
      frameWidth: 84,
      frameHeight: 57,
    });
    this.load.spritesheet("GatoNegroGafas", "img/GatoNegroGafas.png", {
      frameWidth: 84,
      frameHeight: 57,
    });
    this.load.spritesheet("GatoNegroSombrero", "img/GatoNegroSombrero.png", {
      frameWidth: 84,
      frameHeight: 57,
    });
    this.load.spritesheet("Perrito", "img/perritoDef.png", {
      frameWidth: 251,
      frameHeight: 199,
    });
  }

  create() {
    this.add.image(400, 330, "fondoLuz").setScale(0.8);
    this.add.image(410, 330, "ControlesHistoria").setScale(0.7);

    //Flecha Volver
    this.add.image(100, 80, "FlechaAtras").setScale(0.16);

    var paredes = this.physics.add.staticGroup();

    let sueloInicio = this.add.zone(400, 650, 800, 20);
    this.physics.add.existing(sueloInicio, true);
    paredes.add(sueloInicio);

    let GatoSentado = this.add.zone(80, 600, 20, 20);
    this.physics.add.existing(GatoSentado, true);

    Animaciones(this);

    function Sentar(perrito, suelo) {
      this.GatoNar.setVelocityX(0);
      this.GatoNar.anims.play("turn_" + sufijo, true);
    }

    // const colorMap = {
    //   Naranja: 1, Blanco: 2, Negro: 3,
    //   BlancoGafas: 4, NegroGafas: 5, NaranjaGafas: 6,
    //   NaranjaSombrero: 7, BlancoSombrero: 8, NegroSombrero: 9,
    // };
    // this.gatoColor = colorMap[localStorage.getItem("michi_color")] ?? 1;

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
      this.gatoColor = colorMap[claveCompleta] ?? 1;

    const texturaGato =
      this.gatoColor === 2
        ? "GatoBlanco"
        : this.gatoColor === 3
          ? "GatoNegro"
          : this.gatoColor === 4
            ? "GatoBlancoGafas"
            : this.gatoColor === 5
              ? "GatoNegroGafas"
              : this.gatoColor === 6
                ? "GatoNaranjaGafas"
                : this.gatoColor === 7
                  ? "GatoNaranjaSombrero"
                  : this.gatoColor === 8
                    ? "GatoBlancoSombrero"
                    : this.gatoColor === 9
                      ? "GatoNegroSombrero"
                      : "GatoNaranjaF";
 
    const sufijo =
      this.gatoColor === 2
        ? "Blanco"
        : this.gatoColor === 3
          ? "Negro"
          : this.gatoColor === 4
            ? "BlancoGafas"
            : this.gatoColor === 5
              ? "NegroGafas"
              : this.gatoColor === 6
                ? "NaranjaGafas"
                : this.gatoColor === 7
                  ? "NaranjaSombrero"
                  : this.gatoColor === 8
                    ? "BlancoSombrero"
                    : this.gatoColor === 9
                      ? "NegroSombrero"
                      : "Naranja";
 
    const escala =
      this.gatoColor === 2
        ? 0.9
        : this.gatoColor === 3
          ? 1.1
          : this.gatoColor === 4
            ? 0.9
            : this.gatoColor === 5
              ? 1.1
              : this.gatoColor === 6
                ? 1.6
                : this.gatoColor === 7
                  ? 1.6
                  : this.gatoColor === 8
                    ? 0.9
                    : this.gatoColor === 9
                      ? 1.1
                      : 1.6;
    this.GatoNar = this.physics.add
      .sprite(700, 600, texturaGato)
      .setScale(escala);

    // this.GatoNar = this.physics.add
    //   .sprite(700, 600, "GatoNaranjaF")
    //   .setScale(1.6);
    this.GatoNar.setCollideWorldBounds(true);
    this.physics.add.collider(this.GatoNar, paredes);

    // cinematica
    this.GatoNar.setVelocityX(-160);
    this.GatoNar.setFlipX(false);
    this.GatoNar.anims.play("left_" + sufijo, true);
    this.physics.add.collider(GatoSentado, this.GatoNar, Sentar, null, this);

    //Flecha Volver
    const Volver = this.add.zone(75, 56, 50, 48);
    Volver.setOrigin(0);
    Volver.setInteractive();
    Volver.once("pointerdown", () => this.scene.start("Menu"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Volver);

    ///Comenzar la aventura
    const Nivel1Iniciar = this.add.zone(120, 474, 580, 43);
    Nivel1Iniciar.setOrigin(0);
    Nivel1Iniciar.setInteractive();
    Nivel1Iniciar.once("pointerdown", () => this.scene.start("MainScene"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Nivel1Iniciar);
  }

  update() {}
}
