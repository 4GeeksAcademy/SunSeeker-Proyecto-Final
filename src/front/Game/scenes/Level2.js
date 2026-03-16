import Phaser from "phaser";
import { Controles } from "../Controles/Controles";
import { Animaciones } from "../Animaciones/Animaciones";
import { CommunicatorMusic } from "../CommunicatorMusic";

export default class Level2 extends Phaser.Scene {
  constructor() {
    super("Level2");
  }

  preload() {
    this.load.baseURL = "./";

    this.load.image("fondoHorizontal", "img/FondoNivel2.png");
    this.load.image("TablaIzq", "img/TablaIzquierda.png");
    this.load.image("TablaDer", "img/TablaDerecha.png");
    this.load.image("TablaMedio", "img/TablaMedio.png");
    this.load.image("TablaLarga", "img/sueloLargo.png");
    this.load.image("Caja", "img/caja.png");
    this.load.image("Pez", "img/pezAzulSF.png");
    this.load.image("Menu", "img/MenuSFondo.png");
    this.load.image("ScoreFondo", "img/vacioLargo.png");
    this.load.spritesheet("GatoNaranjaF", "img/GatoNaranja1.png", {
      frameWidth: 49,
      frameHeight: 31,
    });
    this.load.spritesheet("GatoBlanco", "img/GatoBlanco.png", {
      frameWidth: 89,
      frameHeight: 58,
    });

    // ── Nuevo enemigo: Paloma/Pajaro ─────────────────────────────
    // Reemplazá con el sprite que tengas
    // this.load.spritesheet("Pajaro", "img/pajaros.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });
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

    this.isDead = false;
    const WORLD_W = 3200;
    const WORLD_H = 700; 

    // ── Fondos ───────────────────────────────────────────────────
    this.add
      .image(1640, 310, "fondoHorizontal").setScale(1.6)
   

    // ── Plataformas ──────────────────────────────────────────────
    var platforms = this.physics.add.staticGroup();


    platforms.create(595, 600, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(356, 550, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(900, 550, "TablaMedio").setScale(0.14).refreshBody();
    platforms.create(790, 380, "TablaIzq").setScale(0.3).refreshBody();
   platforms.create(1005, 290, "TablaDer").setScale(0.3).refreshBody();
    platforms.create(1005, 450, "TablaDer").setScale(0.3).refreshBody();
    platforms.create(790, 200, "TablaIzq").setScale(0.3).refreshBody();
    
    // Suelo continuo
    for (let x = 0; x <= WORLD_W; x += 160) {
      platforms
        .create(x, WORLD_H - 10, "TablaLarga")
        .setScale(0.8)
        .refreshBody();
    }

    // // Plataformas elevadas a lo largo del callejón
    // [
    //   { x: 300, y: 520, tipo: "TablaMedio", e: 0.13 },
    //   { x: 550, y: 440, tipo: "TablaIzq", e: 0.3 },
    //   { x: 800, y: 530, tipo: "TablaDer", e: 0.3 },
    //   { x: 1050, y: 420, tipo: "TablaMedio", e: 0.13 },
    //   { x: 1300, y: 500, tipo: "TablaLarga", e: 0.8 },
    //   { x: 1550, y: 390, tipo: "TablaIzq", e: 0.3 },
    //   { x: 1800, y: 470, tipo: "TablaDer", e: 0.3 },
    //   { x: 2000, y: 410, tipo: "TablaMedio", e: 0.13 },
    //   { x: 2250, y: 510, tipo: "TablaLarga", e: 0.8 },
    //   { x: 2500, y: 400, tipo: "TablaIzq", e: 0.3 },
    //   { x: 2750, y: 470, tipo: "TablaDer", e: 0.3 },
    //   { x: 3000, y: 420, tipo: "TablaMedio", e: 0.13 },
    // ].forEach(({ x, y, tipo, e }) => {
    //   platforms.create(x, y, tipo).setScale(e).refreshBody();
    // });

    // Solo colisión desde arriba (igual que nivel 1)
    platforms.children.iterate((p) => {
      p.body.checkCollision.down = false;
      p.body.checkCollision.left = false;
      p.body.checkCollision.right = false;
    });

    // ── Paredes invisibles ───────────────────────────────────────
    var paredes = this.physics.add.staticGroup();

    const addZone = (x, y, w, h) => {
      const z = this.add.zone(x, y, w, h);
      this.physics.add.existing(z, true);
      paredes.add(z);
    };

    addZone(5, WORLD_H / 2, 10, WORLD_H); // pared izquierda
    addZone(WORLD_W - 5, WORLD_H / 2, 10, WORLD_H); // pared derecha

    // ── Zona de victoria (amanecer al final) ─────────────────────
    const zonaFinal = this.add.zone(WORLD_W - 40, WORLD_H / 2, 40, WORLD_H);
    this.physics.add.existing(zonaFinal, true);

    // Indicador visual — reemplazá con un sprite si tenés uno
    

    // ── Gato jugador ─────────────────────────────────────────────
    this.gatoColor = 1; // mismo valor que en MainScene
    const textura = this.gatoColor === 2 ? "GatoBlanco" : "GatoNaranjaF";
    const escala = this.gatoColor === 2 ? 0.9 : 1.6;

    this.GatoNar = this.physics.add
      .sprite(900, WORLD_H - 120, textura)
      .setScale(escala);

    this.GatoNar.setCollideWorldBounds(true);
    this.GatoNar.setBounce(0.1);
    this.GatoNar.Score = 0;

    this.physics.add.collider(
      this.GatoNar,
      platforms,
      null,
      (gato, plataforma) =>
        gato.body.velocity.y >= 0 &&
        gato.body.bottom <= plataforma.body.top + 20,
      this,
    );
    this.physics.add.collider(this.GatoNar, paredes);

    // Victoria al llegar al amanecer
    this.physics.add.overlap(
      this.GatoNar,
      zonaFinal,
      () => {
        if (this.isDead) return;
        this.physics.pause();
        this.time.addEvent({
          delay: 1000,
          callback: () =>
            this.scene.start("endScene", { score: this.GatoNar.Score }),
        });
      },
      null,
      this,
    );

    // ── Enemigos: Pájaros patrullando ────────────────────────────
    // this.pajaro = this.physics.add.group();

    // [400, 900, 1200, 1700, 2100, 2600, 3000].forEach((x) => {
    //   const p = this.pajaro.create(x, WORLD_H - 150, "Pajaro").setScale(0.8);
    //   p.setBounce(1, 0);
    //   p.setVelocityX(Phaser.Math.Between(80, 140));
    //   p.minX = x - 220;
    //   p.maxX = x + 220;
    // });

    // this.physics.add.collider(this.pajaro, platforms);
    // this.physics.add.overlap(
    //   this.GatoNar,
    //   this.pajaros,
    //   () => {
    //     if (this.isDead) return;
    //     this.isDead = true;
    //     this.physics.pause();
    //     this.GatoNar.anims.play("Muerte_Naranja", true);
    //     this.time.addEvent({
    //       delay: 2000,
    //       callback: () =>
    //         this.scene.start("endScene", { score: this.GatoNar.Score }),
    //     });
    //   },
    //   null,
    //   this,
    // );

    // ── Peces coleccionables ─────────────────────────────────────
    var peces = this.physics.add.group();
    this.physics.add.collider(peces, platforms);

    [
      { x: 300, y: 490 },
      { x: 550, y: 410 },
      { x: 800, y: 500 },
      { x: 1050, y: 390 },
      { x: 1300, y: 470 },
      { x: 1550, y: 360 },
      { x: 1800, y: 440 },
      { x: 2000, y: 380 },
      { x: 2500, y: 370 },
      { x: 3000, y: 390 },
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

    // ── Mundo y cámara horizontal ────────────────────────────────
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.GatoNar, true, 0.1, 0.1);

    // ── HUD ──────────────────────────────────────────────────────
    this.gametime = 90;
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
      .text(16, 16, "Score: 0", { fontSize: "32px", fill: "#000" })
      .setScrollFactor(0);

    // Botón menú
    this.add.image(730, 30, "Menu").setScale(0.06).setScrollFactor(0);
    const menuZone = this.add
      .zone(673, 10, 115, 38)
      .setOrigin(0)
      .setScrollFactor(0);
    menuZone.setInteractive();
    menuZone.once("pointerdown", () => this.scene.start("Menu"));

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

    // Pájaros: invierten al llegar a sus límites de patrulla
    // this.pajaros.children.iterate((p) => {
    //   if (p.x > p.maxX) p.setVelocityX(-Math.abs(p.body.velocity.x));
    //   if (p.x < p.minX) p.setVelocityX(Math.abs(p.body.velocity.x));
    // });

    Controles(this); // ← firma correcta según tu Controles.js
  }
}
