import "./Ranking.css";

export const Ranking = () => {
    return (
        <>
            <div className="ranking-page-container">
                <p className="subtitulo mt-5"> RANKING </p>
                <div className="ranking">
                    <div className="player-card top3">
                        <div className="rank-number"></div>
                        <div className="cat-avatar">🐱</div>
                        <div className="player-info">
                            <div className="player-name">michi_name</div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill"></div>
                            </div>
                        </div>
                        <div className="score">148,320</div>
                    </div>

                    <div className="player-card top3">
                        <div className="rank-number"></div>
                        <div className="cat-avatar">🐱</div>
                        <div className="player-info">
                            <div className="player-name">michi_name</div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill"></div>
                            </div>
                        </div>
                        <div className="score">121,880</div>
                    </div>

                    <div className="player-card top3">
                        <div className="rank-number"></div>
                        <div className="cat-avatar">🐱</div>
                        <div className="player-info">
                            <div className="player-name">michi_name</div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill"></div>
                            </div>
                        </div>
                        <div className="score">98,540</div>
                    </div>

                    <div className="player-card">
                        <div className="rank-number">4</div>
                        <div className="cat-avatar">🐱</div>
                        <div className="player-info">
                            <div className="player-name">michi_name</div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill"></div>
                            </div>
                        </div>
                        <div className="score">74,210</div>
                    </div>

                    <div className="player-card">
                        <div className="rank-number">5</div>
                        <div className="cat-avatar">🐱</div>
                        <div className="player-info">
                            <div className="player-name">michi_name</div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill"></div>
                            </div>
                        </div>
                        <div className="score">61,090</div>
                    </div>
                </div>
            </div>
        </>
    )
}