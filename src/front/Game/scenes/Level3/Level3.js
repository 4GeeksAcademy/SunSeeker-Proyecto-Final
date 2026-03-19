// import { createSpritesheets } from "./spritesheets";
// import { assets } from "../../assets_game";
import { createWalls } from "./walls";
import { createPlatforms } from "./platforms";
import { createColliders, createEnemies, createPlayer, GatoNarDeath} from "./player";
import { Controles } from "../../Controles/Controles";
import { Animaciones } from "../../Animaciones/Animaciones";
import { CommunicatorMusic } from "../../CommunicatorMusic";

export default class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
  }
init(data) {
  this.previousScore = data.score ?? 0;
}
  preload() {
  // createSpritesheets(this)
  this.load.image('pared-izq', "img/ParedIzquierda.png")
  this.load.image('pared-der', "img/ParedDerecha.png")
  this.load.image('caja', "img/CajaAXel.png")
  this.load.image('techos', "img/Tejado.png")
  this.load.image('suelo', "img/Suelo.png")
  this.load.image('paredFond', "img/MuroFondo.png")
  this.load.image('cielo', "img/Cielo.png")
  this.load.image('puerta', "img/puertaGato.png")
  this.load.image('pez', "img/pezAzulSF.png")
  this.load.image("Modal", "public/img/ModalMenuSF.png");
  this.load.image("Menu", "public/img/MenuSFondo.png");
  this.load.image("ScoreFondo", "public/img/vacioLargo.png");
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
  init(data) {
  this.previousScore = data.score ?? 0;
}
ScoreText = "";
  create() {
    this.ScoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    this.ScoreText.setScrollFactor(0);
    


    //music
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
       


  Animaciones(this)
  createWalls(this)
  createPlatforms(this)
  createPlayer(this)
  createEnemies(this)
  createColliders(this)
  this.GatoNar.Score = this.previousScore || 0;
  this.ScoreText.setText("Score: " + this.GatoNar.Score);
  //puntos
  function PuntosGato(gato, pezTocando) {
      pezTocando.disableBody(true, true);
      this.GatoNar.Score += 25;
      console.log("Puntos:", this.GatoNar.Score);
      this.ScoreText.setText("Score: " + this.GatoNar.Score);
    }

    this.physics.add.overlap(this.GatoNar, this.peces, PuntosGato, null, this);
  //score img
  this.add.image(115, 34, "ScoreFondo").setScale(0.46).setScrollFactor(0).setDepth(-1)
  //score
  this.gametime = 140;
    this.timeTXT = this.add.text(350, 0, this.gametime, {
      fontFamily: "font1",
      fontSize: "64px",
      fill: "#000",
    });
    this.refreshTime();
    this.timeTXT.setScrollFactor(0);
      // Boton Volver al Menu
    this.add.image(730, 30, "Menu").setScale(0.06).setScrollFactor(0);
    const MenuBtn = this.add.zone(673, 10, 115, 38);
    MenuBtn.setOrigin(0);
    MenuBtn.setInteractive().setScrollFactor(0);

    MenuBtn.on("pointerdown", () => {
      this.physics.pause();
      this.time.paused = true;

      const overlay = this.add
        .rectangle(400, 350, 800, 800, 0x000000, 0.6)
        .setScrollFactor(0)
        .setDepth(10);

      // Aqui pones tu imagen, botones y texto
      const modalImg = this.add
        .image(400, 300, "Modal")
        .setScrollFactor(0)
        .setDepth(10)
        .setScale(0.3);

      const btnSi = this.add
        .zone(270, 316, 110, 70)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(11);
      btnSi.setOrigin(0);
      btnSi.setInteractive().setScrollFactor(0);
      // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnSi).setScrollFactor(0);

      const btnNo = this.add
        .zone(430, 316, 110, 70)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(11);
      btnNo.setOrigin(0);
      btnNo.setInteractive().setScrollFactor(0);
      // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(btnNo).setScrollFactor(0);

      btnSi.once("pointerdown", () => {
        this.scene.start("Menu");
      });

      btnNo.once("pointerdown", () => {
        overlay.destroy();
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

  this.physics.world.setBounds(126, -3000, 564, 3000 + this.scale.height)
  this.cameras.main.setBounds(126, -3000, this.scale.width, 3000 + this.scale.height);
  this.cameras.main.startFollow(this.GatoNar)
  }
  
 refreshTime() {
    this.gametime--;
    this.timeTXT.setText(this.gametime);
    if (this.gametime === 0) {
      this.physics.pause();
      GatoNarDeath(this.GatoNar, this)
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
    Controles(this)
    // updateEnemies(this)
  }
}
