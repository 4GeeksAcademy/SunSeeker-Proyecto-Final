import { useEffect, useState } from "react";
import "./Ranking.css";
import { queryRanking } from "../../Service/BackEndServices";

export const Ranking = () => {

    const [ranking, setRanking] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const delay = new Promise(resolve => setTimeout(resolve, 3000));
            const [data] = await Promise.all([queryRanking(), delay]);
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
        <div className="ranking-page-container">
            <p className="subtitulo"> RANKING </p>

            <div className="ranking">
                {ranking.length > 0 ? (
                    ranking.map(({ id, michi_name, score }, index) => (
                        <div key={id} className={`player-card ${index < 3 ? "top3" : ""}`}>
                            <div className="rank-number">{index + 1}</div>
                            <div className="cat-avatar">🐱</div>
                            <div className="player-info">
                                <div className="player-name">{michi_name}</div>
                                <div className="score-bar-bg">
                                    <div className="score-bar-fill" style={{ width: `${(score / ranking[0].score) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="score">{score}</div>
                        </div>
                    ))
                ) : (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="player-card esqueleto-fijo">
                                <div className="rank-number">?</div>
                                <div className="cat-avatar esqueleto-bloqueado"></div>
                                <div className="player-info">
                                    <div className="esqueleto-line-name"></div>
                                    <div className="score-bar-bg"></div>
                                </div>
                                <div className="score">0000</div>
                            </div>
                        ))}
                        {!loading && (
                            <div className="no-data-overlay">
                                <p> NO SE ENCONTRARON SUNSEEKERS...</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
//  