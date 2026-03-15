import { Animaciones } from "../Animaciones/Animaciones";

export default class Controles extends Phaser.Scene {
  constructor() {
    super("Controles");
  }

preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");
    this.load.image("FlechaAtras", "img/FlechaAtras.png");

    this.load.spritesheet("GatoNaranjaF", "img/GatoNaranja1.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
  }

  create() {
    this.add.image(400, 330, "fondoLuz").setScale(0.8);

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

    this.gatoColor = 2; 

    const texturaGato = (this.gatoColor === 2) ? "GatoBlanco" : "GatoNaranjaF";
    const sufijo = (this.gatoColor === 2) ? "Blanco" : "Naranja";
    const escala = (this.gatoColor === 2) ? 0.9 : 1.6;


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
    this.GatoNar.anims.play("left_" + sufijo , true);
    this.physics.add.collider(GatoSentado, this.GatoNar, Sentar, null, this);

    //Flecha Volver
    const Volver = this.add.zone(75, 56, 50, 48);
    Volver.setOrigin(0);
    Volver.setInteractive();
    Volver.once("pointerdown", () => this.scene.start("Menu"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Volver);
  }

update() {}


}