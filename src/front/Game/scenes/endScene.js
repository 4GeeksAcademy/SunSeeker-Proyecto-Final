import { Animaciones } from "../Animaciones/Animaciones";

export const obtenerNombreDelGato = () => {
  const nombreGuardado = localStorage.getItem("michi_name");
  return nombreGuardado ? nombreGuardado : "Invitado";
};

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

   this.load.spritesheet("GatoNaranjaF", "img/GatoNaranja1.png", {
      frameWidth: 49,
      frameHeight: 36,
    });
  }

  create() {
    //Nombre del jugador traido del localstore
    const nombreDelJugador = obtenerNombreDelGato();

    this.add.image(400, 330, "fondoLuz").setScale(0.8);
    this.add.text(100, 150, nombreDelJugador + ' consigió ' + this.PuntosObtenidos + " puntos", {
      fontSize: "32px",
      fill: "#fff",
    });

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
      .sprite(700, 600, "GatoNaranjaF")
      .setScale(1.6);
    this.GatoNar.setCollideWorldBounds(true);
    this.physics.add.collider(this.GatoNar, paredes);

    // cinematica
    this.GatoNar.setVelocityX(-160);
    this.GatoNar.setFlipX(false);
    this.GatoNar.anims.play("left", true);
    this.physics.add.collider(GatoSentado, this.GatoNar, Sentar, null, this);

     ///Boton Volver al Menu
    this.add.image(730, 30, "Menu").setScale(0.06).setScrollFactor(0);
    //funcion volver al menu
    const Menu = this.add.zone(673, 10, 115, 38);
    Menu.setOrigin(0);
    Menu.setInteractive().setScrollFactor(0);
    Menu.once("pointerdown", () => this.scene.start("Menu"));
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Menu).setScrollFactor(0);

    
  }

  update() {}
}
