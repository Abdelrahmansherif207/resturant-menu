import React, { useEffect, useState } from "react";

export default function Counter() {
    const [count, setcount] = useState(0);
    const [count1, setcount1] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setcount((prev) => prev + 1);
        }, 1000);
    }, [count1]);

    const handleClick = () => {
        setcount1((prev) => prev + 1);
    };
    return (
        <>
            <div>Counter : {count}</div>
            <button onClick={handleClick} className="btn">
                Counter 1: {count1}
            </button>
        </>
    );
}
