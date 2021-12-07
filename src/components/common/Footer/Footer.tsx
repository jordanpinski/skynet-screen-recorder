export const Footer = () => {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p>
                            {startYear === currentYear
                                ? currentYear
                                : `${startYear} - ${currentYear}`}{" "}
                            Skynet Screen Recorder | Developed by Jordan Pinski
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
