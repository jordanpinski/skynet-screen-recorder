import { ReactSVG } from "react-svg";

export const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="content">
                <ReactSVG src="/svg/logo-icon.svg" />
                <span>Loading</span>
            </div>
        </div>
    );
};
