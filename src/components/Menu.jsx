import React from "react";
import CartIcon from "./cartIcon";
import Filter from "./filter";
import Pagination from "./pagination";
import SearchBar from "./searchBar";
export default function Menu({
    items,
    categories,
    handleAddItemToCart,
    loading,
    selectedCategory,
    handleSelectCategory,
    selectedPage,
    handleSelectPage,
    pages,
    handleSearch,
}) {
    if (loading) {
        return (
            <div className="flex justify-center mt-5 w-full h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    return (
        <div className="flex justify-center flex-col items-center mt-5 w-full">
            <div className="w-full mb-7">
                <SearchBar handleSearch={handleSearch} />
            </div>
            <div className="flex gap-2 w-full justify-center mb-2">
                {categories.map((cat) => (
                    <Filter
                        key={cat.id}
                        category={cat}
                        selectedCategory={selectedCategory}
                        handleSelectCategory={handleSelectCategory}
                    />
                ))}
            </div>
            <ul className="list bg-base-100 rounded-box shadow-md mt-5 w-xl">
                {items.map((itm) => (
                    <li
                        className="list-row mb-2 flex justify-between items-center"
                        key={itm.id}
                    >
                        <div className="flex justify-around items-center w-full">
                            <div className="flex items-center justify-center">
                                <img
                                    src={itm.imageUrl}
                                    alt={itm.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            </div>
                            <div className="text-center">{itm.name}</div>
                            <div className="text-s font-semibold opacity-60 text-center">
                                Price: {itm.price}$
                            </div>
                        </div>
                        <CartIcon
                            id={itm.id}
                            active={itm.isInCart}
                            handler={handleAddItemToCart}
                        />
                    </li>
                ))}
            </ul>
            {pages.length !== 1 ? (
                <div className="flex justify-center mt-5 w-full">
                    <Pagination
                        pages={pages}
                        selectedPage={selectedPage}
                        handleSelectPage={handleSelectPage}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
