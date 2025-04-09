import React, { useState } from "react";
import ProductForm from "../components/productForm.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function Admin({ items, loading, categories, handleDelete }) {
    const [modal, setModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [existingProduct, setExistingProduct] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleModal = () => setModal(!modal);

    const handleEditProduct = (product) => {
        setIsUpdating(true);
        setExistingProduct(product);
        setModal(true);
    };

    const handleAddProduct = () => {
        setIsUpdating(false);
        setExistingProduct(null);
        setModal(true);
    };

    const handleDeleteProduct = async () => {
        if (productToDelete) {
            console.log(productToDelete.id);
            try {
                const response = await fetch(
                    `http://localhost:3000/items/${productToDelete.id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to delete product");
                }

                handleDelete(productToDelete.id);

                setShowDeleteConfirm(false);
                setProductToDelete(null);
                toast.success("Product Deleted Successfully!");
            } catch (error) {
                console.log(error);
                toast.error("Error while deleting product");
            }
        }
    };

    const confirmDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteConfirm(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-5 w-full h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <>
            <div className="text-center text-3xl mt-5 mb-5 font-bold flex justify-center items-center gap-5">
                <p>All Products</p>
                <div
                    onClick={handleAddProduct}
                    className="bg-emerald-500 p-2 rounded-full cursor-pointer hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 stroke-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={item.imageUrl}
                                                alt="Avatar"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-sm opacity-50">
                                        {
                                            categories.find(
                                                (cat) =>
                                                    cat.id === item.category
                                            ).name
                                        }
                                    </div>
                                </td>
                                <td>
                                    {item.price}
                                    <span className="text-sm opacity-50 pl-2">
                                        $
                                    </span>
                                </td>
                                <td>
                                    {" "}
                                    {
                                        categories.find(
                                            (cat) => cat.id === item.category
                                        ).name
                                    }
                                </td>
                                <th className="group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 cursor-pointer group-hover:text-blue-500 transition-all duration-300 ease-in-out"
                                        onClick={() => handleEditProduct(item)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </th>
                                <th className="group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 cursor-pointer group-hover:text-red-500 transition-all duration-300 ease-in-out"
                                        onClick={() => confirmDelete(item)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirm Delete Modal */}
            {showDeleteConfirm && (
                <div className="modal modal-open fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-100 z-50">
                    <div className="modal-box relative bg-white p-6 rounded-md shadow-lg w-96">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Are you sure you want to delete the product:{" "}
                            <span className="text-red-500">
                                {productToDelete?.name}
                            </span>
                            ?{" "}
                        </h3>

                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
                                onClick={handleDeleteProduct}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="w-full bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {modal && (
                <ProductForm
                    handleModal={handleModal}
                    categories={categories}
                    existingProduct={existingProduct}
                    isUpdating={isUpdating}
                />
            )}
        </>
    );
}
