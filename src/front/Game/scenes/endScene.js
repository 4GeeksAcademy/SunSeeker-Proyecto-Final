import { Animaciones } from "../Animaciones/Animaciones";
import { CommunicatorMusic } from "../CommunicatorMusic";

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
      frameHeight: 31,
    });
    this.load.spritesheet("GatoBlanco", "img/GatoBlanco.png", {
      frameWidth: 89,
      frameHeight: 58,
    });
  }

  create() {
    //esto es parte del bloque de codigo del reproductor de Jamendo - funciona por el momento con nivel uno, menu y escena final
    CommunicatorMusic.removeAllListeners("change-music-state");
    CommunicatorMusic.on("change-music-state", (data) => {
      if (!this.scene.isActive() || !this.sys) return;

      if (data.isPlaying) {
        if (this.physics && this.physics.world) this.physics.resume();
        if (this.GatoNar && this.GatoNar.anims) {
          this.GatoNar.anims.resume();
          if (data.bpm) this.GatoNar.anims.timeScale = data.bpm / 120;
        }
      } else {
        if (this.physics && this.physics.world) this.physics.pause();
        if (this.GatoNar && this.GatoNar.anims) {
          this.GatoNar.anims.pause();
        }
      }
    });

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
    this.GatoNar.anims.play("left_"+ sufijo, true);
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
