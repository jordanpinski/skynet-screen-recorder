import { FC } from "react";

export interface IButton {
    onClick?: (action: any) => void;
    htmlType?: "button" | "anchor";
    title?: string;
    className?: string;
    disabled?: boolean;
}

export const Button: FC<IButton> = ({
    onClick,
    htmlType = "button",
    children,
    title = "",
    className = "",
    disabled = false,
}) => {
    return (
        <div className={className}>
            {htmlType === "button" ? (
                <button
                    onClick={onClick}
                    title={title}
                    disabled={disabled ? true : false}
                >
                    {children}
                </button>
            ) : (
                <a href="" title={title}>
                    {children}
                </a>
            )}
        </div>
    );
};
