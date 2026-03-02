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
  }

  update() {}
}
