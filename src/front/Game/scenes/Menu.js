import { Animaciones } from "../Animaciones/Animaciones";
import { CommunicatorMusic } from "../CommunicatorMusic";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");
    this.load.image("Jugar", "img/menuJugar.png");
    this.load.image("Controles", "img/menuControles.png");
    this.load.image("Inventario", "img/menuInventario.png");
    this.load.image("Niveles", "img/menuNiveles.png");

    this.load.spritesheet("GatoNaranja", "img/gatoNaranjaFinal.png", {
      frameWidth: 48,
      frameHeight: 31,
    });
  }

  create() {
    // Fondo
    this.add.image(400, 330, "fondoLuz").setScale(0.8);

    //menu
    this.add.image(440, 150, "Jugar").setScale(0.7);
    this.add.image(440, 220, "Niveles").setScale(0.35);
    this.add.image(440, 290, "Inventario").setScale(0.7);
    this.add.image(440, 360, "Controles").setScale(0.35);

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

    const jugarOption = this.add.zone(265, 126, 350, 48);
    jugarOption.setOrigin(0);
    jugarOption.setInteractive();
    jugarOption.once("pointerdown", () => this.scene.start("MainScene"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(jugarOption);

    //esto es parte del bloque de codigo del reproductor de Jamendo - funciona por el momento con nivel uno, menu y escena final
    jugarOption.once("pointerdown", () => {
      CommunicatorMusic.emit("request-play-music");
      this.scene.start("MainScene");
    });

    const nivelesOption = this.add.zone(265, 196, 350, 48);
    nivelesOption.setOrigin(0);
    nivelesOption.setInteractive();
    nivelesOption.once("pointerdown", () => this.scene.start("Niveles"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(nivelesOption);

    const inventarioOption = this.add.zone(265, 266, 350, 48);
    inventarioOption.setOrigin(0);
    inventarioOption.setInteractive();
    inventarioOption.once("pointerdown", () => this.scene.start("Inventario"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inventarioOption);

    const controlesOption = this.add.zone(265, 336, 350, 48);
    controlesOption.setOrigin(0);
    controlesOption.setInteractive();
    controlesOption.once("pointerdown", () => this.scene.start("Controles"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(controlesOption);
  }

  update() {}
}
