import { useEffect, useState } from "react";
import "./Ranking.css";
import { queryRanking } from "../../Service/BackEndServices";

export const Ranking = () => {

    const [ranking, setRanking] = useState([])


    const fetchData = async () => {
        try {
            const data = await queryRanking();
            const top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);
            setRanking(top5);   
        } 
        catch (error){
            console.log("error:", error.message);
        } 
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <div className="ranking-page-container">
                <p className="subtitulo mt-5"> RANKING </p>
                <div className="ranking">
                    {ranking.map(({ id, michi_name, score }, index) => (
                            <div key={id} className={`player-card ${index < 3 ? "top3" : ""}`}>
                                <div className="rank-number"></div>
                                <div className="cat-avatar">🐱</div>
                                <div className="player-info">
                                    <div className="player-name">{michi_name}</div>
                                    <div className="score-bar-bg">
                                        <div className="score-bar-fill"></div>
                                    </div>
                                </div>
                                <div className="score">{score}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};