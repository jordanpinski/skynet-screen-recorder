import { useEffect, useState } from "react";

export const Timer = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTime(time + 1);
        }, 1000);

        return () => clearTimeout(timeout);
    });

    return <span className="timer">{getFormattedTime(time)}</span>;
};

const getFormattedTime = (time: number): string => {
    return new Date(time * 1000).toISOString().substr(11, 8);
};
