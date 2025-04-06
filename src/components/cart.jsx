import React from "react";
import CartItem from "./cartitem";

export default function Cart({
    items,
    handleIncrement,
    handleDecrement,
    handleDelete,
    handleReset,
}) {
    return (
        <div>
            <ul className="flex justify-center gap-7 my-5">
                {items.map((item) => (
                    <li key={item.id}>
                        <CartItem
                            key={item.id}
                            item={item}
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                            handleDelete={handleDelete}
                        />
                    </li>
                ))}
            </ul>

            {items.length > 0 && (
                <button className="btn" onClick={handleReset}>
                    Reset
                </button>
            )}

            {items.length === 0 && (
                <div className="text-center text-3xl font-bold opacity-60">
                    Your cart is empty
                </div>
            )}
        </div>
    );
}
