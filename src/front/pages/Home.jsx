import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PhaserGame from "../components/PhaserGame.jsx";
import { JamendoCall } from "../Service/BackEndServices.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	console.log(store.Music);
	
	useEffect(()=>{
		JamendoCall(dispatch)
	},[])

	return (
		<div >
		<PhaserGame/>
		</div>
	);
}; 