import { Animaciones } from "../Animaciones/Animaciones";

export default class Inventario extends Phaser.Scene {
  constructor() {
    super("Inventario");
  }

  preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");
    this.load.image("fondoAmarillo", "img/VacioSF.png");
    this.load.image("FlechaAtras", "img/FlechaAtras.png");

    this.load.spritesheet("GatoNaranjaF", "img/GatoNaranja1.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet("GatoBlanco", "img/GatoBlanco.png", {
      frameWidth: 89,
      frameHeight: 58,
    });
    this.load.spritesheet("GatoNegro", "img/GatoNegroSF.png", {
      frameWidth: 84,
      frameHeight: 57,
    });
  }

  create() {
    Animaciones(this);

    this.add.image(400, 330, "fondoLuz").setScale(0.8);

    // Flecha Volver
    this.add.image(100, 80, "FlechaAtras").setScale(0.16);

    // Fondos de Gato
    this.add.image(220, 200, "fondoAmarillo").setScale(0.6);
    this.add.image(400, 200, "fondoAmarillo").setScale(0.6);
    this.add.image(580, 200, "fondoAmarillo").setScale(0.6);
    // this.add.image(220, 400, "fondoAmarillo").setScale(0.6);
    // this.add.image(400, 400, "fondoAmarillo").setScale(0.6);
    // this.add.image(580, 400, "fondoAmarillo").setScale(0.6);

    //Gatos PAra elegir
    this.add.sprite(220, 200, "GatoNaranjaF", 5).setScale(2);
    this.add.sprite(400, 200, "GatoBlanco", 5).setScale(1.2);
    this.add.sprite(577, 200, "GatoNegro", 5).setScale(1.4);

    var paredes = this.physics.add.staticGroup();

    let sueloInicio = this.add.zone(400, 650, 800, 20);
    this.physics.add.existing(sueloInicio, true);
    paredes.add(sueloInicio);

    let GatoSentado = this.add.zone(80, 640, 20, 20);
    this.physics.add.existing(GatoSentado, true);

    const colorMap = { Naranja: 1, Blanco: 2, Negro: 3 };
    this.gatoColor = colorMap[localStorage.getItem("michi_color")] ?? 1;
    // this.gatoColor = 3;

    const texturaGato =
      this.gatoColor === 2
        ? "GatoBlanco"
        : this.gatoColor === 3
          ? "GatoNegro"
          : "GatoNaranjaF";
    const sufijo =
      this.gatoColor === 2
        ? "Blanco"
        : this.gatoColor === 3
          ? "Negro"
          : "Naranja";
    const escala =
      this.gatoColor === 2 ? 0.9 : this.gatoColor === 3 ? 1.1 : 1.6;

    this.GatoNar = this.physics.add
      .sprite(700, 600, texturaGato)
      .setScale(escala);

    this.GatoNar.setCollideWorldBounds(true);
    this.physics.add.collider(this.GatoNar, paredes);

    // Cinemática
    this.GatoNar.setVelocityX(-160);
    this.GatoNar.setFlipX(false);
    this.GatoNar.anims.play("left_" + sufijo, true);

    function Sentar() {
      this.GatoNar.setVelocityX(0);
      const s =
        this.gatoColor === 2
          ? "Blanco"
          : this.gatoColor === 3
            ? "Negro"
            : "Naranja";
      this.GatoNar.anims.play("turn_" + s, true);
    }
    this.physics.add.collider(GatoSentado, this.GatoNar, Sentar, null, this);

    const cambiarGato = (nuevoColor) => {
      this.gatoColor = nuevoColor;

      const nuevaTextura =
        nuevoColor === 2
          ? "GatoBlanco"
          : nuevoColor === 3
            ? "GatoNegroF"
            : "GatoNaranjaF";

      const nuevoSufijo =
        nuevoColor === 2 ? "Blanco" : nuevoColor === 3 ? "Negro" : "Naranja";

      const nuevaEscala =
        nuevoColor === 2? 0.9
          : nuevoColor === 3
            ? 1.1 
            : 1.6;

      const colorNombre =
        nuevoColor === 2 ? "Blanco" : nuevoColor === 3 ? "Negro" : "Naranja";

      localStorage.setItem("michi_color", colorNombre);

      // this.GatoNar.body.reset(700, 600);
      this.GatoNar.setPosition(700, 550);
      this.GatoNar.setVelocityX(-160);
      this.GatoNar.setVelocityY(0);
      this.GatoNar.setFlipX(false);

      this.GatoNar.setTexture(nuevaTextura);
      this.GatoNar.setScale(nuevaEscala);
      this.GatoNar.anims.play("left_" + nuevoSufijo, true);
    };

    const btnGatoNaranja = this.add
      .zone(160, 140, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(1));
    btnGatoNaranja.setOrigin(0);
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnGatoNaranja).setScrollFactor(0);

    const btnGatoBlanco = this.add
      .zone(340, 140, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(2));
    btnGatoBlanco.setOrigin(0);
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnGatoBlanco).setScrollFactor(0);

    const btnGatoNegro = this.add
      .zone(518, 140, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(3));
    btnGatoNegro.setOrigin(0);
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnGatoNegro).setScrollFactor(0);

    // Flecha Volver al Menu
    const Volver = this.add.zone(75, 56, 50, 48);
    Volver.setOrigin(0);
    Volver.setInteractive();
    Volver.once("pointerdown", () => this.scene.start("Menu"));
  }

  update() {}
}
