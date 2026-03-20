import { useEffect, useRef, useState } from "react";
import PhaserGame from "../components/PhaserGame"
import useGlobalReducer from "../hooks/useGlobalReducer"
import "./Game.css";
import { CommunicatorMusic } from "./CommunicatorMusic";
import { jamendoCall } from "../Service/BackEndServices";
import { FrasesMichiGame } from "./FrasesMichiGame";

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
        const audio = audioRef.current;
        audio.pause();
        audio.src = "";
        setIsPlaying(false);

        return () => {
            audio.pause();
            audio.src = "";
            CommunicatorMusic.emit("change-music-state", { isPlaying: false });
            CommunicatorMusic.removeAllListeners("request-play-music");
        };
    }, [])

    useEffect(() => {
        const pauseFromPhaser = () => {
            const audio = audioRef.current;
            audio.pause();
            setIsPlaying(false);
            CommunicatorMusic.emit("change-music-state", { isPlaying: false });
        };
        CommunicatorMusic.on("request-pause-music", pauseFromPhaser);
        return () => {
            CommunicatorMusic.off("request-pause-music", pauseFromPhaser);
        };
    }, []);

    useEffect(() => {
        const playFromPhaser = () => {
            if (tracks.length === 0) {
                setTimeout(() => {
                    CommunicatorMusic.emit("request-play-music");
                }, 1000);
                return;
            }
            if (!isPlaying) handleTogglePlay();
        };
        CommunicatorMusic.removeAllListeners("request-play-music");
        CommunicatorMusic.on("request-play-music", playFromPhaser);
        return () => {
            CommunicatorMusic.off("request-play-music", playFromPhaser);
        };
    }, [tracks, isPlaying, currentTrackIndex]);

    const handleTogglePlay = () => {
        const audio = audioRef.current;
        const currentTrack = tracks[currentTrackIndex];
        if (!currentTrack) return;
        if (!audio.src || audio.src !== currentTrack.audio) {
            audio.src = currentTrack.audio;
            audio.volume = 0.2;  // CAMBIA EL VOLUMEN VALORES DEL 0 AL 1
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            CommunicatorMusic.emit("change-music-state", { isPlaying: false });
        } else {
            audio.volume = 0.2; // CAMBIA EL VOLUMEN VALORES DEL 0 AL 1
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    const bpm = currentTrack.musicinfo?.bpm || 120;
                    CommunicatorMusic.emit("change-music-state", {
                        isPlaying: true,
                        bpm: bpm
                    });
                })
                .catch(e => console.error("Error al reproducir:", e));
        }
    };

    const changeTrack = (direccion) => {
        if (tracks.length === 0) return;
        const newIndex = direccion === "next" ? (currentTrackIndex + 1) % tracks.length : (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(newIndex);
        const audio = audioRef.current;
        const nextTrack = tracks[newIndex];
        audio.src = nextTrack.audio;
        audio.load();

        if (isPlaying) {
            audio.play()
                .then(() => {
                    const bpm = nextTrack.musicinfo?.bpm || 120;
                    CommunicatorMusic.emit("change-music-state", {
                        isPlaying: true,
                        bpm: bpm
                    });
                })
                .catch(e => console.error("Error al saltar de pista:", e));
        } else {
            CommunicatorMusic.emit("change-music-state", { isPlaying: false });
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
                        <div className="pixel-regresar" onClick={() => changeTrack('prev')}>
                            <div className="pixel-flecha-left"></div>
                            <div className="pixel-bar"></div>
                        </div>
                        <div className="pixel-play-circulo" onClick={handleTogglePlay}>
                            {isPlaying ? (
                                <div className="pause"><i className="fa-solid fa-pause"></i></div>
                            ) : (
                                <div className="pixel-play-triangulo"></div>
                            )}
                        </div>
                        <div className="pixel-adelantar" onClick={() => changeTrack('next')}>
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
            <FrasesMichiGame />
        </div>
    );
};