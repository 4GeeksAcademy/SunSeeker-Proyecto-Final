import "./Accesorios.css";

export const Accesorios = () => {
    return (
        <>
            <div className="container accesorios-container mt-4"> 
                <main className="main-content">
                    <div className="row w-100 justify-content-center">
                        <section className="col-12 col-lg-5 mb-4 mb-lg-0 d-flex flex-column align-items-center">
                            <p className="titulo-accesorios">MIS ACCESORIOS</p>
                            <div className="perfil-card">
                                <div className="michi-placeholder">
                                    <img src="" alt="" className="michi-img" />
                                </div>
                            </div>
                        </section>

                        <section className="col-12 col-lg-7">
                            <div className="accesorios-list">
                                <div className="elementos-item">
                                    <div className="item-icon"></div>
                                    <div className="item-info">
                                        <p className="item-name">Gorro Pro</p>
                                        <p className="item-type">Cabeza</p>
                                    </div>
                                    <button className="btn-equipar">Equipar</button>
                                </div>
                                <div className="elementos-item">
                                    <div className="item-icon"></div>
                                    <div className="item-info">
                                        <p className="item-name">Gorro Pro</p>
                                        <p className="item-type">Cabeza</p>
                                    </div>
                                    <button className="btn-equipar">Equipar</button>
                                </div>

                                <div className="elementos-item">
                                    <div className="item-icon"></div>
                                    <div className="item-info">
                                        <p className="item-name">Gorro Pro</p>
                                        <p className="item-type">Cabeza</p>
                                    </div>
                                    <button className="btn-equipar">Equipar</button>
                                </div>

                                <div className="elementos-item">
                                    <div className="item-icon"></div>
                                    <div className="item-info">
                                        <p className="item-name">Gorro Pro</p>
                                        <p className="item-type">Cabeza</p>
                                    </div>
                                    <button className="btn-equipar">Equipar</button>
                                </div>

                                <div className="elementos-item">
                                    <div className="item-icon"></div>
                                    <div className="item-info">
                                        <p className="item-name">Gorro Pro</p>
                                        <p className="item-type">Cabeza</p>
                                    </div>
                                    <button className="btn-equipar">Equipar</button>
                                </div>

                                <div className="elementos-item">
                                    <div className="item-icon"></div>
                                    <div className="item-info">
                                        <p className="item-name">Gorro Pro</p>
                                        <p className="item-type">Cabeza</p>
                                    </div>
                                    <button className="btn-equipar">Equipar</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="row w-100 mt-5">
                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn-submit-guardar">GUARDAR</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}