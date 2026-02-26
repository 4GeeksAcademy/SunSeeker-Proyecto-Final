import Phaser from "phaser";
import { Controles } from "../Controles/Controles";
import { Animaciones } from "../Animaciones/Animaciones";
import { configs } from "eslint-plugin-react-refresh";


export default class MainScene extends Phaser.Scene {




    constructor() {
        super("MainScene");
        
    }



    preload() {
        this.load.baseURL = "./";
        this.load.image('fondo', 'img/fondo.jpg')
        this.load.image('fondoLargo', 'img/mundoRaro.png')
        this.load.image('TablaIzq', 'img/TablaIzquierda.png');
        this.load.image('TablaDer', 'img/TablaDerecha.png')

        this.load.spritesheet('GatoNaranja', 'img/gatoNaranja.png', {frameWidth: 53, frameHeight: 37 })

    }

    create() {

        
        this.GatoNar = "";
        
        // this.add.image(400, 330, 'fondo').setScale(0.8);
        this.add.image(400, 760, 'fondoLargo').setScale(1.1);

        var platforms = this.physics.add.staticGroup();
        platforms.create(265, 280, 'TablaIzq').setScale(0.3).refreshBody();
        platforms.create(570, 390, 'TablaDer').setScale(0.3).refreshBody();
        platforms.create(265, 500, 'TablaIzq').setScale(0.3).refreshBody();
        platforms.create(570, 580, 'TablaDer').setScale(0.3).refreshBody();

        platforms.create(265, 700, 'TablaIzq').setScale(0.3).refreshBody();
        platforms.create(570, 800, 'TablaDer').setScale(0.3).refreshBody();
        platforms.create(265, 900, 'TablaIzq').setScale(0.3).refreshBody();
        platforms.create(570, 980, 'TablaDer').setScale(0.3).refreshBody();

        platforms.create(265, 1100, 'TablaIzq').setScale(0.3).refreshBody();
        platforms.create(570, 1180, 'TablaDer').setScale(0.3).refreshBody();
        platforms.create(265, 1300, 'TablaIzq').setScale(0.3).refreshBody();
        platforms.create(570, 1350, 'TablaDer').setScale(0.3).refreshBody();
        
        let sueloInicio = this.add.zone(400, 1450, 800, 20)
        this.physics.add.existing(sueloInicio, true)
        
        platforms.add(sueloInicio)
        
        
        this.GatoNar = this.physics.add.sprite(420, 1300, 'GatoNaranja').setScale(1.6);
        this.GatoNar.setCollideWorldBounds(true);
        this.GatoNar.setBounce(0.1);
        this.physics.add.collider(this.GatoNar, platforms);
        
        
        Animaciones(this)

        this.physics.world.setBounds(0,0, 800, 1500)
        this.cameras.main.setBounds(0,0, 800, 1500)
        this.cameras.main.startFollow(this.GatoNar, true, 0.1, 0.1)
    }

    update() {

     Controles(this)

    }

}
