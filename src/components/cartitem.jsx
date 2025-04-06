function CartItem({ item, handleIncrement, handleDecrement, handleDelete }) {
    return (
        <div
            style={{ border: "solid 1px #ccc" }}
            className="px-4 py-4 rounded-md "
        >
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            <div className="flex gap-3">
                <button
                    className="btn"
                    onClick={() => handleIncrement(item.id)}
                >
                    +
                </button>
                <button
                    className="btn"
                    onClick={() => handleDecrement(item.id)}
                >
                    -
                </button>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default CartItem;
