import { FC } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const Layout: FC = ({ children }) => {
    return (
        <div className="app">
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">{children}</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
