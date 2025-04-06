import React from "react";

export default function Pagination({ pages, handleSelectPage, selectedPage }) {
    return (
        <div className="join">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`join-item btn btn-sm ${
                        page === selectedPage &&
                        "join-item btn btn-sm btn-active"
                    }`}
                    onClick={() => handleSelectPage(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}
