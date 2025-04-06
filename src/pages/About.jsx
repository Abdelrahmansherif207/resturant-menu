import React from "react";
import { Outlet, Link } from "react-router";

export default function About() {
    return (
        <div>
            <h1>About US</h1>
            <Link to="company">company</Link>
            <Outlet />
        </div>
    );
}
