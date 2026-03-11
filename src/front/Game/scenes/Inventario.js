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

    this.load.spritesheet("GatoNaranja", "img/gatoNaranjaFinal.png", {
      frameWidth: 48,
      frameHeight: 31,
    });
    
  }

  create() {

    Animaciones(this);

    this.add.image(400, 330, "fondoLuz").setScale(0.8);

    //Flecha Volver
    this.add.image(100, 80, "FlechaAtras").setScale(0.16);

    //fondos de Gato
    this.add.image(220, 200, "fondoAmarillo").setScale(0.6);
    this.add.image(400, 200, "fondoAmarillo").setScale(0.6);
    this.add.image(580, 200, "fondoAmarillo").setScale(0.6);
    this.add.image(220, 400, "fondoAmarillo").setScale(0.6);
    this.add.image(400, 400, "fondoAmarillo").setScale(0.6);
    this.add.image(580, 400, "fondoAmarillo").setScale(0.6);

    this.Gato1 = this.add.sprite(220, 200, "GatoNaranja")
      .setScale(1.6);
    this.Gato1.anims.play("left", true);

   
    

    var paredes = this.physics.add.staticGroup();

    let sueloInicio = this.add.zone(400, 650, 800, 20);
    this.physics.add.existing(sueloInicio, true);
    paredes.add(sueloInicio);

    let GatoSentado = this.add.zone(80, 600, 20, 20);
    this.physics.add.existing(GatoSentado, true);


    function Sentar(perrito, suelo) {
      this.GatoNar.setVelocityX(0);
      this.GatoNar.anims.play("turn", true);
    }

    this.GatoNar = this.physics.add
      .sprite(700, 600, "GatoNaranja")
      .setScale(1.6);
    this.GatoNar.setCollideWorldBounds(true);
    this.physics.add.collider(this.GatoNar, paredes);

    // cinematica
    this.GatoNar.setVelocityX(-160);
    this.GatoNar.setFlipX(false);
    this.GatoNar.anims.play("left", true);
    this.physics.add.collider(GatoSentado, this.GatoNar, Sentar, null, this);

    /// Flecha Volver
    const Volver = this.add.zone(75, 56, 50, 48);
    Volver.setOrigin(0);
    Volver.setInteractive();
    Volver.once("pointerdown", () => this.scene.start("Menu"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Volver);

    



  }

update() {}


}