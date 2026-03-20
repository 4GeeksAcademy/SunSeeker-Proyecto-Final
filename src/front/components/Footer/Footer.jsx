import "./footer.css";

export const Footer = () => (
    <footer className="footer-callejon mt-3 container-fluid overflow-hidden position-relative">
        <div className="callejon-pixeles"></div>
        <div className="callejon-glow"></div>
        <div className="callejon-box box-1 d-none d-sm-block"></div>
        <div className="callejon-box box-2 d-none d-md-block"></div>
        <div className="callejon-box box-3 d-none d-lg-block"></div>
        <div className="callejon-box box-4 d-none d-md-block"></div>
        <div className="callejon-box box-5 d-none d-lg-block"></div>
        <div className="callejon-box box-6 d-none d-lg-block"></div>

        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-12 col-md-8 col-xl-6 callejon-marca d-flex justify-content-between">
                    <div >

                        <h3 className="mt-2">SunSeeker</h3>
                        <p className="mt-1">Un gato. Una noche.<br />Un amanecer lejano.</p>
                        <p className="small mt-3 opacity-75">© 2026 SunSeeker Studios</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
