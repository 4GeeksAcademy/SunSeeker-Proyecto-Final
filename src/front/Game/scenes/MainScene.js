import Phaser from "phaser";
import { Controles } from "../Controles/Controles";
import { Animaciones } from "../Animaciones/Animaciones";
import { CommunicatorMusic } from "../CommunicatorMusic";

export const obtenerNombreDelGato = () => {
  const nombreGuardado = localStorage.getItem("michi_name");
  return nombreGuardado ? nombreGuardado : "Invitado";
};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  ScoreText = "";
  

  preload() {
    this.load.baseURL = "./";
    this.load.image("fondo", "img/fondo.jpg");
    this.load.image("fondoLargo", "img/mundoRaro.png");
    this.load.image("CasaCiro", "img/CasaDeCiroFn.png");
    this.load.image("TablaIzq", "img/TablaIzquierda.png");
    this.load.image("TablaDer", "img/TablaDerecha.png");
    this.load.image("TablaMedio", "img/TablaMedio.png");
    this.load.image("TablaLarga", "img/sueloLargo.png");
    this.load.image("Pez", "img/pezAzulSF.png");
    this.load.image("PuertaGato", "img/puertaGato.png");

    this.load.spritesheet("GatoNaranja", "img/gatoNaranjaFinal.png", {
      frameWidth: 48,
      frameHeight: 31,
    });
    this.load.spritesheet("Perrito", "img/perritoDef.png", {
      frameWidth: 525,
      frameHeight: 400,
    });
  }

  create() {
    //esto es parte del bloque de codigo del reproductor de Jamendo - funciona por el momento con nivel uno, menu y escena final
    CommunicatorMusic.removeAllListeners("change-music-state");
    CommunicatorMusic.on("change-music-state", (data) => {
      if (!this.sys || !this.scene.isActive()) return;

      if (data.isPlaying) {
        if (this.physics && this.physics.world) {
          this.physics.resume();
        }

        if (this.time) this.time.paused = false;

        if (this.GatoNar && this.GatoNar.anims) {
          this.GatoNar.anims.resume();
          this.GatoNar.anims.play("turn", true);

          if (data.bpm) {
            const speedRatio = data.bpm / 120;
            this.GatoNar.anims.timeScale = speedRatio;
          }
        }
      } else {
        if (this.physics && this.physics.world) this.physics.pause();
        if (this.time) this.time.paused = true;
        if (this.GatoNar && this.GatoNar.anims) {
          this.GatoNar.anims.pause();
        }
      }
    });

    this.GatoNar = "";
    this.Perrito = "";

    //Nombre del jugador traido del localstore
    const nombreDelJugador = obtenerNombreDelGato();

    // this.add.image(400, 330, 'fondo').setScale(0.8);
    this.add.image(400, 760, "fondoLargo").setScale(1.1);
    this.add.image(780, 470, "CasaCiro").setScale(0.6);
    this.add.image(63, 75, "PuertaGato").setScale(0.4);

    var platforms = this.physics.add.staticGroup();

    platforms.create(100, 180, "TablaLarga").setScale(0.8).refreshBody();
    platforms.create(400, 250, "TablaMedio").setScale(0.13).refreshBody();

    platforms.create(700, 350, "TablaLarga").setScale(0.8).refreshBody();
    platforms.create(30, 500, "TablaLarga").setScale(0.8).refreshBody();
    platforms.create(760, 580, "TablaLarga").setScale(0.8).refreshBody();
    platforms.create(350, 400, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(400, 580, "TablaMedio").setScale(0.13).refreshBody();

    platforms.create(265, 700, "TablaIzq").setScale(0.3).refreshBody();
    platforms.create(570, 800, "TablaDer").setScale(0.3).refreshBody();
    platforms.create(370, 870, "TablaMedio").setScale(0.13).refreshBody();
    platforms.create(570, 980, "TablaDer").setScale(0.3).refreshBody();

    platforms.create(265, 1025, "TablaIzq").setScale(0.3).refreshBody();
    platforms.create(570, 1140, "TablaDer").setScale(0.3).refreshBody();
    platforms.create(265, 1250, "TablaIzq").setScale(0.3).refreshBody();
    platforms.create(570, 1350, "TablaDer").setScale(0.3).refreshBody();

    platforms.children.iterate((plataforma) => {
      plataforma.body.checkCollision.down = false;
      plataforma.body.checkCollision.left = false;
      plataforma.body.checkCollision.right = false;
    });

    var paredes = this.physics.add.staticGroup();

    let ParedIzq = this.add.zone(180, 920, 20, 700);
    this.physics.add.existing(ParedIzq, true);
    paredes.add(ParedIzq);

    let ParedIzqHorizontal = this.add.zone(90, 560, 200, 20);
    this.physics.add.existing(ParedIzqHorizontal, true);
    paredes.add(ParedIzqHorizontal);

    let ParedDer = this.add.zone(660, 970, 20, 800);
    this.physics.add.existing(ParedDer, true);
    paredes.add(ParedDer);

    let ParedDerHorizontal = this.add.zone(750, 560, 200, 20);
    this.physics.add.existing(ParedDerHorizontal, true);
    paredes.add(ParedDerHorizontal);

    let sueloInicio = this.add.zone(400, 1450, 800, 20);
    this.physics.add.existing(sueloInicio, true);
    paredes.add(sueloInicio);

    let respawnDog = this.add.zone(15, 1400, 20, 20);
    this.physics.add.existing(respawnDog, true);

    function Respawn(perrito, suelo) {
      perrito.setPosition(770, 490);
      this.Perrito.setVelocityX(150);
    }

    function Morder() {
      this.physics.pause();
      this.GatoNar.setTint(0xff0000);

      this.time.addEvent({
        delay: 2000,
        loop: false,
        callback: () => {
          this.scene.start("endScene", { score: this.GatoNar.Score });
        },
      });
    }

    function Next() {
      this.time.addEvent({
        delay: 1000,
        loop: false,
        callback: () => {
          this.scene.start("endScene", { score: this.GatoNar.Score });
        },
      });
    }
    let NextLevel = this.add.zone(75, 100, 20, 20);
    this.physics.add.existing(NextLevel, true);

    this.Perrito = this.physics.add.sprite(770, 490, "Perrito").setScale(0.13);
    this.Perrito.setCollideWorldBounds(true);
    this.Perrito.setVelocityX(150);
    this.Perrito.setBounce(1, 0);
    this.physics.add.collider(this.Perrito, platforms);
    this.physics.add.collider(this.Perrito, paredes);
    this.physics.add.overlap(this.Perrito, respawnDog, Respawn, null, this);

    this.GatoNar = this.physics.add
      .sprite(420, 1300, "Gatonaranja")
      .setScale(1.6);
    this.GatoNar.setCollideWorldBounds(true);
    this.GatoNar.setBounce(0.1);
    this.physics.add.collider(
      this.GatoNar,
      platforms,
      null,
      (gato, plataforma) => {
        return (
          gato.body.velocity.y >= 0 &&
          gato.body.bottom <= plataforma.body.top + 20
        );
      },
      this,
    );
    this.physics.add.collider(this.GatoNar, paredes);
    this.physics.add.collider(this.Perrito, this.GatoNar, Morder, null, this);
    this.physics.add.overlap(this.GatoNar, NextLevel, Next, null, this);
    this.GatoNar.Score = 0;

    function PuntosGato(gato, pezTocando) {
      pezTocando.disableBody(true, true);
      this.GatoNar.Score += 25;
      console.log("Puntos:", this.GatoNar.Score);
      this.ScoreText.setText("Score: " + this.GatoNar.Score);
    }

    var peces = this.physics.add.group();
    this.physics.add.collider(peces, platforms);
    peces.create(170, 190, "Pez").setScale(0.07);
    peces.create(570, 510, "Pez").setScale(0.07);
    peces.create(265, 550, "Pez").setScale(0.07);
    peces.create(570, 900, "Pez").setScale(0.07);
    peces.create(265, 1150, "Pez").setScale(0.07);

    this.physics.add.overlap(this.GatoNar, peces, PuntosGato, null, this);

    Animaciones(this);

    this.physics.world.setBounds(0, 0, 800, 1500);
    this.cameras.main.setBounds(0, 0, 800, 1500);
    this.cameras.main.startFollow(this.GatoNar, true, 0.1, 0.1);

    this.gametime = 60;
    this.timeTXT = this.add.text(350, 0, this.gametime, {
      fontFamily: "font1",
      fontSize: "64px",
      fill: "#000",
    });
    this.refreshTime();
    this.timeTXT.setScrollFactor(0);

    this.ScoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    this.ScoreText.setScrollFactor(0);

    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  refreshTime() {
    this.gametime--;
    this.timeTXT.setText(this.gametime);
    if (this.gametime === 0) {
      this.physics.pause();
      this.GatoNar.setTint(0xff0000);

      this.time.addEvent({
        delay: 1500,
        loop: false,
        callback: () => {
          this.scene.start("endScene", { score: this.GatoNar.Score });
        },
      });
    } else {
      this.time.delayedCall(1000, this.refreshTime, [], this);
    }
  }

  update() {
    Controles(this, this.cursors, this.perrito);
  }
}
