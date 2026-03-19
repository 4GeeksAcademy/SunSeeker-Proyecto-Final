import Phaser from "phaser";
import { Controles } from "../Controles/Controles";
import { Animaciones } from "../Animaciones/Animaciones";
import { CommunicatorMusic } from "../CommunicatorMusic";

export default class Level2 extends Phaser.Scene {
  constructor() {
    super("Level2");
  }

  init(data) {
  this.previousScore = data.score ?? 0;
}

  preload() {
    this.load.baseURL = "./";

    this.load.image("Modal", "img/ModalMenuSF.png");
    this.load.image("fondoHorizontal", "img/FondoNivel2.png");
    this.load.image("TablaIzq", "img/TablaIzquierda.png");
    this.load.image("TablaDer", "img/TablaDerecha.png");
    this.load.image("TablaMedio", "img/TablaMedio.png");
    this.load.image("TablaLarga", "img/sueloLargo.png");
    this.load.image("Caja", "img/caja.png");
    this.load.image("Pez", "img/pezAzulSF.png");
    this.load.image("Menu", "img/MenuSFondo.png");
    this.load.image("ScoreFondo", "img/vacioLargo.png");
    this.load.image("PuertaGato", "img/puertaGato.png");

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
    CommunicatorMusic.removeAllListeners("change-music-state");
    CommunicatorMusic.on("change-music-state", (data) => {
      if (!this.sys || !this.scene.isActive()) return;

      if (data.isPlaying) {
        if (this.physics?.world) this.physics.resume();

        if (this.time) this.time.paused = false;
        if (this.GatoNar?.anims) {
          this.GatoNar.anims.resume();
          if (data.bpm) this.GatoNar.anims.timeScale = data.bpm / 120;
        }
      } else {
        if (this.physics?.world) this.physics.pause();
        if (this.time) this.time.paused = true;
        if (this.GatoNar?.anims) this.GatoNar.anims.pause();
      }
    });
    CommunicatorMusic.emit("request-play-music"); 
   

    this.isDead = false;
    const WORLD_W = 3200;
    const WORLD_H = 700;

    this.add.image(1640, 310, "fondoHorizontal").setScale(1.6);
    this.add.image(3150, 600, "PuertaGato").setScale(0.4);

    var paredesCallejon = this.physics.add.staticGroup();

    let ParedDer = this.add.zone(1090, 95, 20, 700);
    this.physics.add.existing(ParedDer, true);
    paredesCallejon.add(ParedDer);

    let ParedIzq = this.add.zone(700, 15, 20, 700);
    this.physics.add.existing(ParedIzq, true);
    paredesCallejon.add(ParedIzq);

    let ParedDerFinal = this.add.zone(2670, 180, 20, 300);
    this.physics.add.existing(ParedDerFinal, true);
    paredesCallejon.add(ParedDerFinal);

    var platforms = this.physics.add.staticGroup();

    platforms.create(595, 600, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(356, 550, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(900, 550, "TablaMedio").setScale(0.14).refreshBody();
    platforms.create(790, 380, "TablaIzq").setScale(0.3).refreshBody();
    platforms.create(1005, 290, "TablaDer").setScale(0.3).refreshBody();
    platforms.create(1005, 450, "TablaDer").setScale(0.3).refreshBody();
    platforms.create(790, 200, "TablaIzq").setScale(0.3).refreshBody();
    platforms.create(2790, 550, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(2950, 435, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(2750, 350, "TablaMedio").setScale(0.13).refreshBody();

    for (let x = 0; x <= WORLD_W; x += 160) {
      platforms
        .create(x, WORLD_H - 10, "TablaLarga")
        .setScale(0.8)
        .refreshBody();
    }

    var cajas = this.physics.add.staticGroup();

    cajas.create(1400, 650, "Caja").setScale(0.3).refreshBody();
    cajas.create(2300, 650, "Caja").setScale(0.3).refreshBody();

    platforms.children.iterate((p) => {
      p.body.checkCollision.down = false;
      p.body.checkCollision.left = false;
      p.body.checkCollision.right = false;
    });

    var paredes = this.physics.add.staticGroup();

    const addZone = (x, y, w, h) => {
      const z = this.add.zone(x, y, w, h);
      this.physics.add.existing(z, true);
      paredes.add(z);
    };

    addZone(5, WORLD_H / 2, 10, WORLD_H);
    addZone(WORLD_W - 5, WORLD_H / 2, 10, WORLD_H);

    const zonaFinal = this.add.zone(3150, 1200 / 2, 40, 100);
    this.physics.add.existing(zonaFinal, true);

    function Morder() {
      if (this.isDead) return;
      this.isDead = true;
      this.physics.pause();
      this.GatoNar.anims.play("Muerte_" + sufijo, true);
      this.time.addEvent({
        delay: 2000,
        loop: false,
        callback: () => {
          this.scene.start("endScene", { score: this.GatoNar.Score });
        },
      });
    }

    //perro callejon
    this.PerritoCallejon = this.physics.add
      .sprite(900, 140, "Perrito")
      .setScale(0.3);
    this.PerritoCallejon.setCollideWorldBounds(true);
    this.PerritoCallejon.setVelocityX(150);
    this.PerritoCallejon.setBounce(1, 0);
    this.PerritoCallejon.body.allowGravity = false;
    this.physics.add.collider(this.PerritoCallejon, paredesCallejon);

    //perro entre cajas
    this.Perrito = this.physics.add.sprite(1450, 620, "Perrito").setScale(0.3);
    this.Perrito.setCollideWorldBounds(true);
    this.Perrito.setVelocityX(150);
    this.Perrito.setBounce(1, 0);
    this.physics.add.collider(this.Perrito, platforms);
    this.physics.add.collider(this.Perrito, cajas);

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
      .sprite(90, WORLD_H - 120, texturaGato)
      .setScale(escala);

    this.GatoNar.setCollideWorldBounds(true);
    this.GatoNar.setBounce(0.1);
    this.GatoNar.Score = this.previousScore ?? 0; 

    this.physics.add.collider(
      this.GatoNar,
      platforms,
      null,
      (gato, plataforma) =>
        gato.body.velocity.y >= 0 &&
        gato.body.bottom <= plataforma.body.top + 20,
      this,
    );
    this.physics.add.collider(this.GatoNar, cajas);
    this.physics.add.collider(this.GatoNar, paredes);
    this.physics.add.collider(this.Perrito, this.GatoNar, Morder, null, this);
    this.physics.add.collider(
      this.PerritoCallejon,
      this.GatoNar,
      Morder,
      null,
      this,
    );
    this.physics.add.collider(this.GatoNar, paredesCallejon);

    this.physics.add.overlap(
      this.GatoNar,
      zonaFinal,
      () => {
        if (this.isDead) return;
        this.time.addEvent({
          delay: 1000,
          callback: () =>
            this.scene.start("endScene", { score: this.GatoNar.Score }),
        });
      },
      null,
      this,
    );

    var peces = this.physics.add.group();
    this.physics.add.collider(peces, platforms);
    [
      { x: 360, y: 490 },
      { x: 600, y: 410 },
      { x: 800, y: 100 },
      { x: 1000, y: 390 },
      { x: 1300, y: 470 },
      { x: 1550, y: 360 },
      { x: 1800, y: 440 },
      { x: 2000, y: 380 },
      { x: 2790, y: 370 },
      { x: 2750, y: 290 },
    ].forEach(({ x, y }) => peces.create(x, y, "Pez").setScale(0.07));

    this.physics.add.overlap(
      this.GatoNar,
      peces,
      (gato, pez) => {
        pez.disableBody(true, true);
        this.GatoNar.Score += 25;
        this.ScoreText.setText("Score: " + this.GatoNar.Score);
      },
      null,
      this,
    );

    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.GatoNar, true, 0.1, 0.1);

    this.gametime = 60;
    this.timeTXT = this.add
      .text(370, 5, this.gametime, {
        fontFamily: "font1",
        fontSize: "64px",
        fill: "#000",
      })
      .setScrollFactor(0);

    this.refreshTime();

    this.add.image(115, 34, "ScoreFondo").setScale(0.46).setScrollFactor(0);
    this.ScoreText = this.add
  .text(16, 16, "Score: " + this.GatoNar.Score, { fontSize: "32px", fill: "#000" })
  .setScrollFactor(0);

        // Boton Volver al Menu
this.add.image(730, 30, "Menu").setScale(0.06).setScrollFactor(0);
const MenuBtn = this.add.zone(673, 10, 115, 38);
MenuBtn.setOrigin(0);
MenuBtn.setInteractive().setScrollFactor(0);

MenuBtn.on("pointerdown", () => {
  this.physics.pause();
  this.time.paused = true;

  const overlay = this.add.rectangle(400, 350, 800, 800, 0x000000, 0.6)
    .setScrollFactor(0).setDepth(10);

  // Aqui pones tu imagen, botones y texto
  const modalImg = this.add.image(400, 300, "Modal").setScrollFactor(0).setDepth(10).setScale(0.3);

  const btnSi = this.add.zone(270, 316, 110, 70).setInteractive().setScrollFactor(0).setDepth(11);
  btnSi.setOrigin(0);
  btnSi.setInteractive().setScrollFactor(0);
  // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnSi).setScrollFactor(0);

  const btnNo = this.add.zone(430, 316, 110, 70).setInteractive().setScrollFactor(0).setDepth(11);
  btnNo.setOrigin(0);
  btnNo.setInteractive().setScrollFactor(0);
  // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnNo).setScrollFactor(0);

  btnSi.once("pointerdown", () => {
    this.scene.start("Menu");
  });

  btnNo.once("pointerdown", () => {
    overlay.destroy()
    modalImg.destroy();
    btnSi.destroy();
    btnNo.destroy();
    this.physics.resume();
    this.time.paused = false;
  });
});


   this.events.on("shutdown", () => {
     CommunicatorMusic.removeAllListeners("change-music-state");
     CommunicatorMusic.emit("request-pause-music");
   });
   this.events.on("destroy", () => {
     CommunicatorMusic.removeAllListeners("change-music-state");
     CommunicatorMusic.emit("request-pause-music");
   });

    Animaciones(this);
  }

  refreshTime() {
    this.gametime--;
    this.timeTXT.setText(this.gametime);
    if (this.gametime === 0) {
      this.physics.pause();
      this.GatoNar.setTint(0xff0000);
      this.time.addEvent({
        delay: 1500,
        callback: () =>
          this.scene.start("endScene", { score: this.GatoNar.Score }),
      });
    } else {
      this.time.delayedCall(1000, this.refreshTime, [], this);
    }
  }

  update() {
    if (this.isDead) return;
    Controles(this);
  }

  cleanupListeners() {
    CommunicatorMusic.removeAllListeners("change-music-state");
  }
}
