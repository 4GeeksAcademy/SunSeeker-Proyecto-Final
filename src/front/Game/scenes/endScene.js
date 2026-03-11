import { Animaciones } from "../Animaciones/Animaciones";

export default class endScene extends Phaser.Scene {
  constructor() {
    super("endScene");
  }

  init(data) {
    this.PuntosObtenidos = data.score || 0;
  }

  preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");

    this.load.spritesheet("GatoNaranja", "img/gatoNaranjaFinal.png", {
      frameWidth: 48,
      frameHeight: 31,
    });
    
  }

  create() {
    this.add.image(400, 330, "fondoLuz").setScale(0.8);
    this.add.text(
      100,
      150,
      "Tu Gato ha hecho " + this.PuntosObtenidos + " puntos",
      { fontSize: "32px", fill: "#fff" },
    );

    var paredes = this.physics.add.staticGroup();

    let sueloInicio = this.add.zone(400, 650, 800, 20);
    this.physics.add.existing(sueloInicio, true);
    paredes.add(sueloInicio);

    let GatoSentado = this.add.zone(80, 600, 20, 20);
    this.physics.add.existing(GatoSentado, true);

    Animaciones(this);

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
  }

  update() {}
}
