import {
  guardarAccesorio,
  updateMichiColorPhaser,
} from "../../Service/BackEndServices";
import { Animaciones } from "../Animaciones/Animaciones";
import { CommunicatorMusic } from "../CommunicatorMusic";

export default class Inventario extends Phaser.Scene {
  constructor() {
    super("Inventario");
  }

  preload() {
    this.load.baseURL = "./";
    this.load.image("fondoLuz", "img/fondoLuz.jpg");
    this.load.image("fondoAmarillo", "img/VacioSF.png");
    this.load.image("FlechaAtras", "img/FlechaAtras.png");

    this.load.spritesheet("GatoNaranjaF", "img/GatoNaranja1.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet("GatoNaranjaGafas", "img/GatoNaranjaGafas.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet(
      "GatoNaranjaSombrero",
      "img/GatoNaranjaSombrero.png",
      {
        frameWidth: 49,
        frameHeight: 31,
      },
    );
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
    Animaciones(this);

    this.add.image(400, 330, "fondoLuz").setScale(0.8);

    // Flecha Volver
    this.add.image(100, 80, "FlechaAtras").setScale(0.16);

    // Fondos de Gato
    this.add.image(220, 150, "fondoAmarillo").setScale(0.6);
    this.add.image(400, 150, "fondoAmarillo").setScale(0.6);
    this.add.image(580, 150, "fondoAmarillo").setScale(0.6);
    this.add.image(220, 310, "fondoAmarillo").setScale(0.6);
    this.add.image(400, 310, "fondoAmarillo").setScale(0.6);
    this.add.image(580, 310, "fondoAmarillo").setScale(0.6);
    this.add.image(220, 480, "fondoAmarillo").setScale(0.6);
    this.add.image(400, 480, "fondoAmarillo").setScale(0.6);
    this.add.image(580, 480, "fondoAmarillo").setScale(0.6);

    //Gatos PAra elegir (clicleables)
    this.add.sprite(220, 150, "GatoNaranjaF", 5).setScale(2);
    this.add.sprite(400, 150, "GatoBlanco", 5).setScale(1.2);
    this.add.sprite(577, 150, "GatoNegro", 5).setScale(1.4);
    this.add.sprite(220, 310, "GatoNaranjaGafas", 5).setScale(2);
    this.add.sprite(400, 310, "GatoBlancoGafas", 5).setScale(1.2);
    this.add.sprite(577, 310, "GatoNegroGafas", 5).setScale(1.4);
    this.add.sprite(220, 480, "GatoNaranjaSombrero", 5).setScale(2);
    this.add.sprite(400, 480, "GatoBlancoSombrero", 5).setScale(1.2);
    this.add.sprite(577, 480, "GatoNegroSombrero", 5).setScale(1.4);

    var paredes = this.physics.add.staticGroup();

    let sueloInicio = this.add.zone(400, 650, 800, 20);
    this.physics.add.existing(sueloInicio, true);
    paredes.add(sueloInicio);

    let GatoSentado = this.add.zone(80, 640, 20, 20);
    this.physics.add.existing(GatoSentado, true);

    // const colorMap = {
    //   Naranja: 1,
    //   Blanco: 2,
    //   Negro: 3,
    //   BlancoGafas: 4,
    //   NegroGafas: 5,
    //   NaranjaGafas: 6,
    //   NaranjaSombrero: 7,
    //   BlancoSombrero: 8,
    //   NegroSombrero: 9,
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

    // this.GatoNar = this.physics.add
    //   .sprite(700, 600, texturaGato)
    //   .setScale(escala);

    const offsetYMap = {
      1: 615,
      6: 615,
      7: 615,
      2: 600,
      4: 600,
      8: 600,
      3: 600,
      5: 600,
      9: 600,
    };

    this.GatoNar = this.physics.add
      .sprite(700, offsetYMap[this.gatoColor] ?? 600, texturaGato)
      .setScale(escala);

    this.GatoNar.setCollideWorldBounds(true);
    this.physics.add.collider(this.GatoNar, paredes);

    // Cinemática
    this.GatoNar.setVelocityX(-160);
    this.GatoNar.setFlipX(false);
    this.GatoNar.anims.play("left_" + sufijo, true);

    function Sentar() {
      this.GatoNar.setVelocityX(0);
      const s =
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
      this.GatoNar.anims.play("turn_" + s, true);
    }
    this.physics.add.collider(GatoSentado, this.GatoNar, Sentar, null, this);

    const cambiarGato = (nuevoColor) => {
      this.gatoColor = nuevoColor;

      const nuevaTextura =
        nuevoColor === 2
          ? "GatoBlanco"
          : nuevoColor === 3
            ? "GatoNegro"
            : nuevoColor === 4
              ? "GatoBlancoGafas"
              : nuevoColor === 5
                ? "GatoNegroGafas"
                : nuevoColor === 6
                  ? "GatoNaranjaGafas"
                  : nuevoColor === 7
                    ? "GatoNaranjaSombrero"
                    : nuevoColor === 8
                      ? "GatoBlancoSombrero"
                      : nuevoColor === 9
                        ? "GatoNegroSombrero"
                        : "GatoNaranjaF";

      const nuevoSufijo =
        nuevoColor === 2
          ? "Blanco"
          : nuevoColor === 3
            ? "Negro"
            : nuevoColor === 4
              ? "BlancoGafas"
              : nuevoColor === 5
                ? "NegroGafas"
                : nuevoColor === 6
                  ? "NaranjaGafas"
                  : nuevoColor === 7
                    ? "NaranjaSombrero"
                    : nuevoColor === 8
                      ? "BlancoSombrero"
                      : nuevoColor === 9
                        ? "NegroSombrero"
                        : "Naranja";

      const nuevaEscala =
        nuevoColor === 2
          ? 0.9
          : nuevoColor === 3
            ? 1.1
            : nuevoColor === 4
              ? 0.9
              : nuevoColor === 5
                ? 1.1
                : nuevoColor === 6
                  ? 1.6
                  : nuevoColor === 7
                    ? 1.6
                    : nuevoColor === 8
                      ? 0.9
                      : nuevoColor === 9
                        ? 1.1
                        : 1.6;

      const colorNombre =
        nuevoColor === 2
          ? "Blanco"
          : nuevoColor === 3
            ? "Negro"
            : nuevoColor === 4
              ? "BlancoGafas"
              : nuevoColor === 5
                ? "NegroGafas"
                : nuevoColor === 6
                  ? "NaranjaGafas"
                  : nuevoColor === 7
                    ? "NaranjaSombrero"
                    : nuevoColor === 8
                      ? "BlancoSombrero"
                      : nuevoColor === 9
                        ? "NegroSombrero"
                        : "Naranja";

      // localStorage.setItem("michi_color", colorNombre);
      // updateMichiColorPhaser(colorNombre);

      const accesorioMap = {
        1: null,
        2: null,
        3: null,
        4: "Gafas",
        5: "Gafas",
        6: "Gafas",
        7: "Sombrero",
        8: "Sombrero",
        9: "Sombrero",
      };
      const accesorioActual = accesorioMap[nuevoColor] ?? null;

      const colorBase =
        nuevoColor <= 3
          ? colorNombre
          : colorNombre.replace("Gafas", "").replace("Sombrero", "");

      localStorage.setItem("michi_color", colorBase);
      localStorage.setItem("michi_accesorio", accesorioActual || "");
      updateMichiColorPhaser(colorBase);
      guardarAccesorio(accesorioActual);

      CommunicatorMusic.emit("cambiar_michi", {
        color: colorBase,
        accesorio: accesorioActual,
      });

      const offsetYMap = {
        1: 615,
        6: 615,
        7: 615, // Naranjas
        2: 600,
        4: 600,
        8: 600, // Blancos
        3: 600,
        5: 600,
        9: 600, // Negros
      };

      this.GatoNar.setPosition(700, offsetYMap[nuevoColor] ?? 600);

      this.GatoNar.setVelocityX(-160);
      this.GatoNar.setVelocityY(0);
      this.GatoNar.setFlipX(false);

      this.GatoNar.setTexture(nuevaTextura);
      this.GatoNar.setScale(nuevaEscala);
      this.GatoNar.anims.play("left_" + nuevoSufijo, true);
    };
    const btnGatoNaranja = this.add
      .zone(160, 90, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(1));
    btnGatoNaranja.setOrigin(0);
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnGatoNaranja).setScrollFactor(0);

    const btnGatoBlanco = this.add
      .zone(340, 90, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(2));
    btnGatoBlanco.setOrigin(0);
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnGatoBlanco).setScrollFactor(0);

    const btnGatoNegro = this.add
      .zone(518, 90, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(3));
    btnGatoNegro.setOrigin(0);
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnGatoNegro).setScrollFactor(0);

    const btnGatoBlancoGafas = this.add
      .zone(340, 250, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(4));
    btnGatoBlancoGafas.setOrigin(0);
    // this.add
    //   .graphics()
    //   .lineStyle(2, 0xff0000)
    //   .strokeRectShape(btnGatoBlancoGafas)
    //   .setScrollFactor(0);

    const btnGatoNegroGafas = this.add
      .zone(518, 250, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(5));
    btnGatoNegroGafas.setOrigin(0);
    // this.add
    //   .graphics()
    //   .lineStyle(2, 0xff0000)
    //   .strokeRectShape(btnGatoNegroGafas)
    //   .setScrollFactor(0);

    const btnGatoNaranjaGafas = this.add
      .zone(160, 250, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(6));
    btnGatoNaranjaGafas.setOrigin(0);
    // this.add
    //   .graphics()
    //   .lineStyle(2, 0xff0000)
    //   .strokeRectShape(btnGatoNaranjaGafas)
    //   .setScrollFactor(0);

    const btnGatoNaranjaSombrero = this.add
      .zone(160, 420, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(7));
    btnGatoNaranjaSombrero.setOrigin(0);
    // this.add
    //   .graphics()
    //   .lineStyle(2, 0xff0000)
    //   .strokeRectShape(btnGatoNaranjaSombrero)
    //   .setScrollFactor(0);

    const btnGatoBlancoSombrero = this.add
      .zone(340, 420, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(8));
    btnGatoBlancoSombrero.setOrigin(0);
    // this.add
    //   .graphics()
    //   .lineStyle(2, 0xff0000)
    //   .strokeRectShape(btnGatoBlancoSombrero)
    //   .setScrollFactor(0);

    const btnGatoNegroSombrero = this.add
      .zone(518, 420, 115, 115)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => cambiarGato(9));
    btnGatoNegroSombrero.setOrigin(0);
    // this.add
    //   .graphics()
    //   .lineStyle(2, 0xff0000)
    //   .strokeRectShape(btnGatoNegroSombrero)
    //   .setScrollFactor(0);

    // Flecha Volver al Menu
    const Volver = this.add.zone(75, 56, 50, 48);
    Volver.setOrigin(0);
    Volver.setInteractive();
    Volver.once("pointerdown", () => this.scene.start("Menu"));

    
    // CommunicatorMusic.on("cambiar_michi", ({ color, accesorio }) => {
    //   const clave = accesorio ? `${color}${accesorio}` : color;
    //   const colorMap = {
    //     Naranja: 1,
    //     Blanco: 2,
    //     Negro: 3,
    //     BlancoGafas: 4,
    //     NegroGafas: 5,
    //     NaranjaGafas: 6,
    //     NaranjaSombrero: 7,
    //     BlancoSombrero: 8,
    //     NegroSombrero: 9,
    //   };
    //   const nuevoColor = colorMap[clave] ?? 1;
    //   cambiarGato(nuevoColor);
    // });

    // this.events.on("shutdown", () => {
    //   CommunicatorMusic.off("cambiar_michi");
    // });
  }

  update() {}
}
