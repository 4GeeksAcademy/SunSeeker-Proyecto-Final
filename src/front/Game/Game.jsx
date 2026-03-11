import PhaserGame from "../components/PhaserGame"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Game = () => {
    return (
        <div className=" d-flex justify-content-center align-items-center mt-3">
            <PhaserGame />
        </div>
    )
}
