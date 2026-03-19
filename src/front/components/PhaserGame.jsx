import { useEffect, useRef } from "react";
import Phaser from "phaser";

import MainScene from "../Game/scenes/MainScene";
import Level2 from "../Game/scenes/Level2";
import Level3 from "../Game/scenes/Level3/Level3";
import endScene from "../Game/scenes/endScene";
import Menu from "../Game/scenes/Menu";
import Controles from "../Game/scenes/Controles";
import Inventario from "../Game/scenes/Inventario";
import Niveles from "../Game/scenes/Niveles";

export default function PhaserGame() {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Si ya hay una instancia, no crear otra (evita duplicados al hot-reload)
    if (gameRef.current) return;

    // Configuración básica de Phaser. Aquí definimos el render, tamaño,
    // sistema de físicas y las escenas que usaremos.
    const config = {
      // Phaser.AUTO: elige WebGL si está disponible, si no, usa Canvas
      type: Phaser.AUTO,
      // `parent` es el elemento DOM donde Phaser insertará el canvas
      parent: containerRef.current,
      width: 800,
      height: 700,
      backgroundColor: "#1d1d1d",
      // escala automatica para las ditintas pantallas
      scale: {
            mode: Phaser.Scale.FIT},
      physics: {
        // Usamos el sistema 'arcade' por ser sencillo para prototipos
        default: "arcade",
        arcade: {
          gravity: { y: 1000},
          debug: true,
        },
      },
      // Lista de escenas; aquí pasamos la clase que implementa la lógica
      scene: [Menu,MainScene,Level2,Level3,Inventario,Niveles,endScene,Controles],
    };

    // Crear la instancia del juego con la configuración
    gameRef.current = new Phaser.Game(config);

    // Cleanup: cuando el componente React se desmonta, destruye el juego
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div style={{ width: 800, height: 700 }}>
      <div ref={containerRef} />
    </div>
  );
}