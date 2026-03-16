import { createSpritesheets } from "./spritesheets";
import { createAnimations } from "./animations";
import { checkControls } from "./controles";
import { assets } from "../../assets_game";
import { createWalls } from "./walls";
import { createPlatforms } from "./platforms";
import { createColliders, createEnemies, createPlayer, onHitEnemy, updateEnemies } from "./player";

export default class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
  }

  preload() {
  createSpritesheets(this)
  this.load.image('pared-izq', assets.entorno.paredIzq)
  this.load.image('pared-der', assets.entorno.paredDer)
  this.load.image('caja', assets.entorno.caja)
  this.load.image('techos', assets.entorno.techos)
  this.load.image('suelo', assets.entorno.suelo)
    
  }

  create() {
  createAnimations(this)
  createWalls(this)
  createPlatforms(this)
  createPlayer(this)
  createEnemies(this)
  createColliders(this)

  this.physics.world.setBounds(0, -2000, this.scale.width, 2000 + this.scale.height)
  this.cameras.main.setBounds(0, -2000, this.scale.width, 2000 + this.scale.height);
  this.cameras.main.startFollow(this.gato)
  }
  
 
  update() {
    checkControls(this)
    updateEnemies(this)
    // onHitEnemy(this)
  }
}
