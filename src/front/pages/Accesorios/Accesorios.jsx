import { useState } from "react";
import "./Accesorios.css";
import { guardarAccesorio, updateMichiColor } from "../../Service/BackEndServices";
import { CommunicatorMusic } from "../../Game/CommunicatorMusic";
import useGlobalReducer from "../../hooks/useGlobalReducer";

const colores = [
    { nombre: "Naranja", imagen: "/img/gatoNaranjaSentado.png", valor: "Naranja" },
    { nombre: "Blanco", imagen: "/img/gatoBlancoSentado.png", valor: "Blanco" },
    { nombre: "Negro", imagen: "/img/gatoNegroSentado.png", valor: "Negro" },
];

const accesoriosPorColor = {
    Naranja: {
        Gafas: { nombre: "Amarillas", imagen: "/img/gafasAmarillas.png" },
        Sombrero: { nombre: "Beige", imagen: "/img/gorroBeige.png" },
    },
    Blanco: {
        Gafas: { nombre: "Negras", imagen: "/img/gafasNegras.png" },
        Sombrero: { nombre: "Marron", imagen: "/img/gorroMarron.png" },
    },
    Negro: {
        Gafas: { nombre: "Rosas", imagen: "/img/gafasRosas.png" },
        Sombrero: { nombre: "Rosa", imagen: "/img/gorroRosa.png" },
    },
};

const imagenGato = {
    Naranja: {
        ninguno: "/img/gatoNaranjaSentado.png",
        Gafas: "/img/gatoNaranjaConGafas.png",
        Sombrero: "/img/gatoNaranjaConSombrero.png",
    },
    Blanco: {
        ninguno: "/img/gatoBlancoSentado.png",
        Gafas: "/img/gatoBlancoConGafas.png",
        Sombrero: "/img/gatoBlancoConSombrero.png",
    },
    Negro: {
        ninguno: "/img/gatoNegroSentado.png",
        Gafas: "/img/gatoNegroConGafas.png",
        Sombrero: "/img/gatoNegroConSombrero.png",
    },
};

const categorias = ["Gafas", "Sombrero"];

export const Accesorios = () => {
    const { dispatch } = useGlobalReducer();
    const ACCESORIOS_VALIDOS = ["Gafas", "Sombrero"];
    const COLORES_VALIDOS = ["Naranja", "Blanco", "Negro"];

    const [colorSeleccionado, setColorSeleccionado] = useState(() => {
        const saved = localStorage.getItem("michi_color");
        return COLORES_VALIDOS.includes(saved) ? saved : "Naranja";
    });
    const [mostrarColores, setMostrarColores] = useState(false);
    const [guardado, setGuardado] = useState(false);
    const [mensaje, setMensaje] = useState();
    
    const [accesorioEquipado, setAccesorioEquipado] = useState(() => {
        const saved = localStorage.getItem("michi_accesorio");
        return ACCESORIOS_VALIDOS.includes(saved) ? saved : null;
    });

    const imagenActual = imagenGato[colorSeleccionado][accesorioEquipado || "ninguno"];

    const elegirColorMichi = (color) => {
        setColorSeleccionado(color.valor);
        localStorage.setItem("michi_color", color.valor);
        setAccesorioEquipado(null);
        setMostrarColores(false);
    };

    const handleEquipar = (tipo) => {
        const nuevo = accesorioEquipado === tipo ? null : tipo;
        setAccesorioEquipado(nuevo);
        dispatch({ type: "set_michi_accesorio", payload: nuevo });
        localStorage.setItem("michi_accesorio", nuevo || "");
    };

    const handleGuardar = async () => {
        setGuardado(true);
        const result = await updateMichiColor(colorSeleccionado);

        if (result.success) {
            const clavePhaser = accesorioEquipado
                ? `${colorSeleccionado}${accesorioEquipado}`
                : colorSeleccionado;
            await guardarAccesorio(accesorioEquipado);

            dispatch({ type: "set_michi_color", payload: colorSeleccionado });
            dispatch({ type: "set_michi_accesorio", payload: accesorioEquipado });
            localStorage.setItem("michi_color", colorSeleccionado);
            localStorage.setItem("michi_accesorio", accesorioEquipado || "");

            CommunicatorMusic.emit("cambiar_michi", {
                color: colorSeleccionado,
                accesorio: accesorioEquipado,
            });

            setMensaje({ text: "GUARDADO!", type: "guardado" });
        } else {
            setMensaje({ text: "ERROR AL GUARDAR", type: "error" });
        }

        setGuardado(false);
        setTimeout(() => setMensaje(null), 2500);
    };

    return (
        <>
            <div className="container accesorios-container mt-4">
                <main className="main-content">
                    <div className="row w-100 justify-content-center">

                        <section className="col-12 col-lg-5 mb-4 mb-lg-0 d-flex flex-column align-items-center">
                            <div className="perfil-card">
                                <button
                                    className="btn-tres-puntos"
                                    onClick={() => setMostrarColores(!mostrarColores)}>
                                    🟧⬜⬛
                                </button>
                                {mostrarColores && (
                                    <div className="selector-colores">
                                        {colores.map(color => (
                                            <div
                                                key={color.valor}
                                                onClick={() => elegirColorMichi(color)}
                                                className={`color-option ${colorSeleccionado === color.valor ? "seleccionado" : ""}`}
                                            >
                                                <img src={color.imagen} alt={color.nombre} />
                                                <p>{color.nombre}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="michi-placeholder">
                                    <img src={imagenActual} alt="michi" className="michi-img" />
                                </div>
                            </div>
                        </section>

                        <section className="col-12 col-lg-7">
                            <p className="titulo-accesorios">MIS ACCESORIOS</p>
                            <div className="accesorios-list">
                                {categorias.map((tipo) => {
                                    const accesorio = accesoriosPorColor[colorSeleccionado][tipo];
                                    const estaEquipado = accesorioEquipado === tipo;
                                    return (
                                        <div key={tipo} className={`elementos-item ${estaEquipado ? "equipado" : ""}`}>
                                            <div className="item-icon">
                                                <img src={accesorio.imagen} alt={tipo} className="img-accesorios" />
                                            </div>
                                            <div className="item-info">
                                                <p className="item-name">{tipo} {accesorio.nombre}</p>
                                                <p className="item-type">{estaEquipado ? "✅ Equipado" : "Accesorio"}</p>
                                            </div>
                                            <button
                                                className="btn-equipar"
                                                onClick={() => handleEquipar(tipo)}
                                            >
                                                {estaEquipado ? "Desequipar" : "Equipar"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="coming-soon">
                                <p>⚙️ ESTAMOS TRABAJANDO EN MAS ACCESORIOS PARA TU MICHI... ¡VOLVE PRONTO! ⚙️</p>
                            </div>
                        </section>

                    </div>
                    <div className="row w-100 mt-5">
                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn-submit-guardar" onClick={handleGuardar} disabled={guardado}>
                                GUARDAR
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            {mensaje && (
                <div className={mensaje.type === "guardado" ? "pixel-alert-guardado" : "pixel-alert-error"}>
                    {mensaje.text}
                </div>
            )}
        </>
    );
};