import React from "react";
import { Link } from "react-router";
export default function Filter({
    category,
    handleSelectCategory,
    selectedCategory,
}) {
    return (
        <div role="tablist" className="tabs tabs-lift flex">
            <Link
                to=""
                role="tab"
                className={`tab ${
                    selectedCategory === category.id && "tab-active"
                }`}
                onClick={() => handleSelectCategory(category.id)}
            >
                {category.name}
            </Link>
        </div>
    );
}
