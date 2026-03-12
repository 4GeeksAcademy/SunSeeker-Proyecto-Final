import { useEffect, useRef, useState } from "react";
import PhaserGame from "../components/PhaserGame"
import useGlobalReducer from "../hooks/useGlobalReducer"
import "./Game.css";
import { CommunicatorMusic } from "./CommunicatorMusic";
import { jamendoCall } from "../Service/BackEndServices";

export const Game = () => {
    const { store, dispatch } = useGlobalReducer();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef(new Audio());
    const tracks = store.Music || [];

    useEffect(() => {
        if (tracks.length === 0) {
            jamendoCall(dispatch);
        }
    }, [])

    const changeMusic = () => {
        const audio = audioRef.current;

        if (tracks.length > 0) {
            const trackUrl = tracks[currentTrackIndex].audio;
            if (!audio.src !== trackUrl) {
                audio.src = trackUrl;
            }

            if (isPlaying) {
                audio.pause();
                CommunicatorMusic.emit("change-music-state", false);
            } else {
                audio.play()
                    .then(() => {
                        CommunicatorMusic.emit("change-music-state", true);
                    })
                    .catch(e => console.error("Error de reproducción:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };
    return (
        <div className="game-screen mt-3">
            <div className="music-container">
                <div className="pixel-reproductor">
                    <div className="nombre-music">
                        {tracks.length > 0 ? tracks[currentTrackIndex].name : "Cargando"}
                    </div>
                    <div className="pixel-buttons-row">
                        <span className="pixel-icono musica"><i className="fa-solid fa-music"></i></span>
                        <div className="pixel-regresar">
                            <div className="pixel-flecha-left"></div>
                            <div className="pixel-bar"></div>
                        </div>
                        <div className="pixel-play-circulo" onClick={changeMusic}>
                            {isPlaying ? (
                                <div className="pause"><i className="fa-solid fa-pause"></i></div>
                            ) : (
                                <div className="pixel-play-triangulo"></div>
                            )}
                        </div>
                        <div className="pixel-adelantar">
                            <div className="pixel-bar"></div>
                            <div className="pixel-flecha-right"></div>
                        </div>
                        <span className="pixel-icon repeat">⇆</span>
                    </div>
                </div>
            </div>
            <main className="phaser-game-wrapper">
                <PhaserGame />
            </main>
        </div>
    );
};