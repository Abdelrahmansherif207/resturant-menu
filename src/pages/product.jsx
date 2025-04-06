import React from "react";
import { useParams } from "react-router";

export default function Product() {
    const { id } = useParams();
    //! useUrlSearchParams
    //! useLocation
    // ?
    console.log(id);
    return <div>product:{id}</div>;
}
