import PhaserGame from "../components/PhaserGame"
import useGlobalReducer from "../hooks/useGlobalReducer"
import "./Game.css";

export const Game = () => {
    return (
        <>
            <div className=" d-flex justify-content-center align-items-center mt-3 position-relative container-juego-completo">
                <div className="position-absolute top-50 start-0 translate-middle-y contenedor-music">
                    <div className="pixel-reproductor mt-4">
                        <div className="pixel-barra-progreso">
                            <div className="pixel-barra-carga"></div>
                        </div>
                        <div className="pixel-buttons-row">
                            <span className="pixel-icono heart">❤</span>
                            <div className="pixel-regresar">
                                <div className="pixel-flecha-left"></div>
                                <div className="pixel-bar"></div>
                            </div>
                            <div className="pixel-play-circulo">
                                <div className="pixel-play-triangulo"></div>
                            </div>
                            <div className="pixel-adelantar">
                                <div className="pixel-bar"></div>
                                <div className="pixel-flecha-right"></div>
                            </div>
                            <span className="pixel-icon repeat">⇆</span>
                        </div>
                    </div>
                </div>
                <PhaserGame />
            </div>
        </>
    )
}
