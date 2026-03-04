import "./footer.css";

export const Footer = () => (
    <footer className="footer-callejon mt-3 container-fluid overflow-hidden position-relative py-5">
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
                <div className="col-12 col-md-8 col-xl-6 callejon-marca">
                    <h3>SunSeeker</h3>
                    <p className="mb-0">Un gato. Una noche.<br />Un amanecer lejano.</p>
                    <p className="small mt-2 opacity-75">© 2025 SunSeeker Studios</p>
                </div>
            </div>
        </div>
    </footer>
);
