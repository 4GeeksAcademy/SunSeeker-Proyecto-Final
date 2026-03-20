import { guardarPartida } from "../../Service/BackEndServices";
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
    //esto es para el score y el ranking
    guardarPartida(this.PuntosObtenidos);

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


    //    const colorMap = {
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
