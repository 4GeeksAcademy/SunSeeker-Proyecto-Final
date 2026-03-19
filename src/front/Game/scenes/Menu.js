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
      this.GatoNar.anims.play("turn_" + sufijo, true);
    }
    
     const colorMap = {
      Naranja: 1, Blanco: 2, Negro: 3,
      BlancoGafas: 4, NegroGafas: 5, NaranjaGafas: 6,
      NaranjaSombrero: 7, BlancoSombrero: 8, NegroSombrero: 9,
    };
    this.gatoColor = colorMap[localStorage.getItem("michi_color")] ?? 1;

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

    this.GatoNar.setCollideWorldBounds(true);
    this.physics.add.collider(this.GatoNar, paredes);

    // cinematica
    this.GatoNar.setVelocityX(-160);
    this.GatoNar.setFlipX(false);
    this.GatoNar.anims.play("left_"+ sufijo, true);
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

    CommunicatorMusic.on("cambiar_michi", ({ color, accesorio }) => {
      if (!this.GatoNar || !this.GatoNar.active) return; 

      const clave = accesorio ? `${color}${accesorio}` : color;
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
      const nuevoColor = colorMap[clave] ?? 1;
      this.gatoColor = nuevoColor;

      const texturaMap = {
        1: "GatoNaranjaF",
        2: "GatoBlanco",
        3: "GatoNegro",
        4: "GatoBlancoGafas",
        5: "GatoNegroGafas",
        6: "GatoNaranjaGafas",
        7: "GatoNaranjaSombrero",
        8: "GatoBlancoSombrero",
        9: "GatoNegroSombrero",
      };
      const sufijoMap = {
        1: "Naranja",
        2: "Blanco",
        3: "Negro",
        4: "BlancoGafas",
        5: "NegroGafas",
        6: "NaranjaGafas",
        7: "NaranjaSombrero",
        8: "BlancoSombrero",
        9: "NegroSombrero",
      };
      const escalaMap = {
        1: 1.6,
        2: 0.9,
        3: 1.1,
        4: 0.9,
        5: 1.1,
        6: 1.6,
        7: 1.6,
        8: 0.9,
        9: 1.1,
      };

      this.GatoNar.setTexture(texturaMap[nuevoColor]);
      this.GatoNar.setScale(escalaMap[nuevoColor]);
      this.GatoNar.anims.play("turn_" + sufijoMap[nuevoColor], true);
    });

  }

  update() {}
}
