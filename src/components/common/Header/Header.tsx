import { useContext } from "react";
import { SkynetContext } from "src/lib/skynetContext";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { ReactSVG } from "react-svg";

export const Header = () => {
    const skynetState = useContext(SkynetContext);
    const mySky = skynetState?.mySky;

    const handleLogin = async () => {
        if (!mySky) return;
        await mySky.requestLoginAccess();
    };

    return (
        <header className="main-header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Logo />

                        <nav className="navigation">
                            <ul>
                                <li>
                                    <Button
                                        className="button button--primary"
                                        title="Login To MySky"
                                        onClick={handleLogin}
                                    >
                                        Login To MySky
                                        <ReactSVG src="/svg/user-solid.svg" />
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
