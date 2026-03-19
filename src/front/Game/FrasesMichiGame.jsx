import { useEffect, useState } from "react";
import "./FrasesMichiGame.css";
import { useFetcher } from "react-router-dom";
import { CommunicatorMusic } from "./CommunicatorMusic";
import { imagenAccesorios } from "../../imagenAccesorios"; 

const frases = [
    "Hoy me siento imparable...",
    "Ese perro no me va a atrapar...",
    "Necesito más pescado...",
    "El sol me llama...",
    "Mis bigotes nunca fallan...",
    "Soy el michi mas rápido del callejón...",
    "Un pez más y soy leyenda...",
    "Nadie me detiene hoy...",
    "El viento huele a aventura...",
    "Mis patitas están listas...",
]

export const FrasesMichiGame = () => {
    const [fraseActual, setFraseActual] = useState(frases[Math.floor(Math.random() * frases.length)]);
    const [color, setColor] = useState(localStorage.getItem("michi_color") || "Naranja");
    const [accesorio, setAccesorio] = useState(localStorage.getItem("michi_accesorio") || "ninguno");

    useEffect(() => {
        const intervalo = setInterval(() => {
            setColor(localStorage.getItem("michi_color") || "Naranja");
            setAccesorio(localStorage.getItem("michi_accesorio") || "ninguno");
            setFraseActual(prev => {
                const otrasFrases = frases.filter(f => f !== prev);
                return otrasFrases[Math.floor(Math.random() * otrasFrases.length)];
            });
        }, 8000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="frase-container">
            <div className="frase-burbuja">
                <p className="frase-texto">"{fraseActual}"</p>
            </div>
            <img
                src={imagenAccesorios[color]?.[accesorio] || "/img/gatoNaranjaSentado.png"}
                alt="michi"
                className="frase-gato"
            />
        </div>
    );
};
