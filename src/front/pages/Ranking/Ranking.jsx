import { useEffect, useState } from "react";
import "./Ranking.css";
import { getRanking } from "../../Service/BackEndServices";
import { imagenAccesorios } from "../../../imagenAccesorios";


export const Ranking = () => {

    const [ranking, setRanking] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const delay = new Promise(resolve => setTimeout(resolve, 3000));
            const [data] = await Promise.all([getRanking(), delay]);
            const top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);
            setRanking(top5);
        }
        catch (error) {
            console.log("error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="ranking-page-container mt-2">
            <p className="subtitulo"> RANKING </p>

            <div className="ranking mt-3">
                {loading ? (
                    <p className="loading-text">Cargando ranking...</p>
                ) : (
                    [...Array(5)].map((_, i) => {
                        const jugador = ranking[i];
                        return jugador ? (
                            <div key={`jugador-${jugador.id}`} className={`player-card ${i < 3 ? "top3" : ""}`}>
                                <div className="rank-number">{i + 1}</div>
                                <div className="cat-avatar">
                                    <img
                                        src={imagenAccesorios[jugador.color]?.[jugador.accesorio || "ninguno"] || "/img/gatoNaranjaSentado.png"}
                                        alt={jugador.michi_name}
                                        className="avatar-img"
                                    />
                                </div>
                                <div className="player-info">
                                    <div className="player-name">{jugador.michi_name}</div>
                                    <div className="score-bar-bg">
                                        <div className="score-bar-fill" style={{ width: `${(jugador.score / ranking[0].score) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="score">{jugador.score}</div>
                            </div>
                        ) : (
                                <div key={`esqueleto-${i}`} className="player-card esqueleto-fijo">
                                <div className="rank-number">?</div>
                                <div className="cat-avatar esqueleto-bloqueado"></div>
                                <div className="player-info">
                                    <div className="esqueleto-line-name"></div>
                                    <div className="score-bar-bg"></div>
                                </div>
                                <div className="score">0000</div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
