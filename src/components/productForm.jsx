import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ProductForm({
    handleModal,
    categories,
    existingProduct,
    isUpdating,
}) {
    // Initialize formData with existing product data if updating
    const [formData, setFormData] = React.useState({
        name: existingProduct?.name || "",
        price: existingProduct?.price || "",
        category: existingProduct?.category || "",
        picture: existingProduct?.picture || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = new FormData();
        newItem.append("name", formData.name);
        newItem.append("price", formData.price);
        newItem.append("category", formData.category);
        newItem.append("picture", formData.picture);

        try {
            let response;
            // PUT
            if (isUpdating) {
                response = await axios.put(
                    `http://localhost:3000/items/${existingProduct.id}`,
                    newItem,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                toast.success("Product updated successfully!");
            } else {
                // _POST
                response = await axios.post(
                    "http://localhost:3000/items",
                    newItem,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                toast.success("Product Added successfully!");
            }
            console.log(response.data);
            handleModal();
        } catch (err) {
            console.log(err);
            toast.error(`Failed to ${isUpdating ? "update" : "add"} product`);
        }
    };

    return (
        <>
            <div className="modal modal-open fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-100 z-50">
                <div className="modal-box relative bg-white p-6 rounded-md shadow-lg w-96">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleModal}
                        >
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">
                        {isUpdating ? "Update Product" : "Add New Product"}
                    </h3>

                    {/* Product Form */}
                    <form>
                        <div className="mb-4 py-4">
                            <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Enter product name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                                Price
                            </label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Enter product price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                                Category
                            </label>
                            <select
                                onChange={handleChange}
                                name="category"
                                value={formData.category}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                {categories
                                    .slice(1, categories.length)
                                    .map((cat) => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                                Picture
                            </label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Enter product category"
                                name="picture"
                                value={formData.picture}
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="flex justify-between space-x-4">
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-all duration-300"
                                onClick={handleSubmit}
                            >
                                {isUpdating ? "Update Product" : "Add Product"}
                            </button>
                            <button
                                type="button"
                                className="w-full bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-all duration-300"
                                onClick={handleModal}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
