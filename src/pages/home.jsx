import React, { useEffect } from "react";
import { useState } from "react";

export default function Home() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const handleClick1 = () => setCount1((prev) => prev + 1);
    const handleClick2 = () => setCount2((prev) => prev + 1);

    //!IMPORTANT
    //* after first render & every render
    //? CASE 1 without depedenecy array

    //* after first render only
    //? CASE 2 with empty array

    //* after first render &
    //? CASE 2 with deps arr with value & change one of array element's value
    //!

    useEffect(() => {
        console.log("Effect!");

        //*cleanup function
        return () => {
            console.log("Cleanup!");
        };
    }, []);
    console.log("Render");
    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleClick1} className="btn btn-accent btn-sm">
                Count2:{count1}
            </button>
            <button onClick={handleClick2} className="btn btn-accent btn-sm">
                Count1:{count2}
            </button>
        </div>
    );
}
