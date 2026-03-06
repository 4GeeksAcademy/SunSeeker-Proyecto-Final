export function Animaciones(Game){
    Game.anims.create({
                key: 'left',
                frames: Game.anims.generateFrameNumbers('GatoNaranja', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1,
            });

            Game.anims.create({
                key: 'turn',
                frames: [{ key: 'GatoNaranja', frame: 3 }],
                frameRate: 10,
                repeat: -1,
            });

            // Game.anims.create({
            //     key: 'Perrito',
            //     frames: Game.anims.generateFrameNumbers('Perrito', { start: 0, end: 1}),
            //     frameRate: 10,
            //     repeat: -1,
            // });
            
}