import { Animaciones } from "../Animaciones/Animaciones";

export default class Niveles extends Phaser.Scene {
  constructor() {
    super("Niveles");
  }

preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");
    this.load.image("Nivel1", "img/Nivel1.png");
    this.load.image("Nivel2", "img/Nivel2.png");
    this.load.image("Nivel3", "img/Nivel3.png");
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
    //Fondo
    this.add.image(400, 330, "fondoLuz").setScale(0.8);

    //Flecha Volver
    this.add.image(100, 80, "FlechaAtras").setScale(0.16);

    //Niveles
    this.add.image(440, 150, "Nivel1").setScale(0.69);
    this.add.image(440, 220, "Nivel2").setScale(0.71);
    this.add.image(440, 290, "Nivel3").setScale(0.698);

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


   const colorMap = { Naranja: 1, Blanco: 2, Negro: 3 };
    this.gatoColor = colorMap[localStorage.getItem("michi_color")] ?? 1;
    // this.gatoColor = 3;

    const texturaGato = this.gatoColor === 2 ? "GatoBlanco"  : this.gatoColor === 3 ? "GatoNegro" :  "GatoNaranjaF";
    const sufijo = this.gatoColor === 2 ? "Blanco" : this.gatoColor === 3 ? "Negro" : "Naranja";
    const escala = this.gatoColor === 2 ? 0.9 : this.gatoColor === 3 ? 1.1  : 1.6;


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


    //Opciones de niveles ////
    const Nivel1Iniciar = this.add.zone(265, 126, 350, 48);
    Nivel1Iniciar.setOrigin(0);
    Nivel1Iniciar.setInteractive();
    Nivel1Iniciar.once("pointerdown", () => this.scene.start("MainScene"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Nivel1Iniciar);

    const Nivel2Iniciar = this.add.zone(265, 196, 350, 48);
    Nivel2Iniciar.setOrigin(0);
    Nivel2Iniciar.setInteractive();
    Nivel2Iniciar.once("pointerdown", () => this.scene.start("Level2"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Nivel2Iniciar);

    const Nivel3Iniciar = this.add.zone(265, 266, 350, 48);
    Nivel3Iniciar.setOrigin(0);
    Nivel3Iniciar.setInteractive();
    Nivel3Iniciar.once("pointerdown", () => this.scene.start("Level3"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Nivel3Iniciar);

    //Flecha Volver
    const Volver = this.add.zone(75, 56, 50, 48);
    Volver.setOrigin(0);
    Volver.setInteractive();
    Volver.once("pointerdown", () => this.scene.start("Menu"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Volver);
  }

update() {}


}