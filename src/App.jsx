import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/header.jsx";
import { Routes, Route } from "react-router";
import Error from "./pages/Error.jsx";
import About from "./pages/About.jsx";
import AboutCompany from "./pages/aboutcompany.jsx";
import ProductForm from "./pages/productform.jsx";
import Product from "./pages/product.jsx";
import Counter from "./components/counter.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./components/Menu.jsx";
import Cart from "./components/cart.jsx";
import axios from "axios";
import Admin from "./pages/admin.jsx";
import { ToastContainer } from "react-toastify";

function App() {
    // States
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchVal, setSearchVal] = useState("");

    // let filteredItems = [];
    // Calling the API
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const { data } = await axios.get(
                "http://localhost:3000/items?_delay=2000"
            );
            const Finaldata = data.map((item) => ({
                ...item,
                category: Number(item.category),
            }));

            const { data: categories } = await axios.get(
                "http://localhost:3000/categories"
            );
            setCategories([{ id: 0, name: "All" }, ...categories]);
            setItems(Finaldata);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Handlers
    const handleAddItemToCart = (id) => {
        const newItems = items.map((itm) => ({
            ...itm,
            isInCart: itm.id === id ? !itm.isInCart : itm.isInCart,
        }));
        setItems(newItems);
    };
    // filteration
    const handleSelectCategory = (id) => {
        setSelectedCategory(id);
        setSelectedPage(1);
    };
    let filteredItems = items.filter((itm) =>
        selectedCategory === 0 ? itm : itm.category === selectedCategory
    );

    // pagination
    const pageSize = 4;
    const noOfPages = Math.ceil(filteredItems.length / pageSize);
    const start = (selectedPage - 1) * pageSize;
    const end = start + pageSize;
    const pages = [];
    for (let i = 1; i <= noOfPages; i++) {
        pages.push(i);
    }
    filteredItems = filteredItems.slice(start, end);

    // Search
    const handleSearch = (event) => setSearchVal(event.target.value);
    filteredItems = filteredItems.filter((itm) =>
        itm.name.toLowerCase().includes(searchVal.toLowerCase())
    );

    const handleSelecetedPage = (page) => setSelectedPage(page);

    const handleIncrement = (id) => {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item.id === id);

        newItems[index] = { ...newItems[index] };
        newItems[index].quantity++;

        setItems(newItems);
        // console.log("inc");
        // console.log(id);
    };

    const handleDecrement = (id) => {
        const newItems = items.map((item) => {
            const itemCopy = { ...item };
            if (itemCopy.id === id && itemCopy.quantity > 0) {
                itemCopy.quantity--;
            }
            return itemCopy;
        });
        setItems(newItems);
        // console.log("dec");
        // console.log(id);
    };

    const handleReset = () => {
        const newItems = items.map((item) => ({ ...item, quantity: 0 }));
        setItems(newItems);
    };

    const handleDelete = (id) => {
        //clone
        //edit
        const newItems = items.filter((item) => item.id !== id);
        //set
        setItems(newItems);
    };

    // Routes
    return (
        <>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <Admin
                            items={items}
                            loading={loading}
                            categories={categories}
                            handleDelete={handleDelete}
                        />
                    }
                />
                <Route
                    path="/"
                    element={
                        <Menu
                            items={filteredItems}
                            categories={categories}
                            handleAddItemToCart={handleAddItemToCart}
                            loading={loading}
                            selectedCategory={selectedCategory}
                            handleSelectCategory={handleSelectCategory}
                            selectedPage={selectedPage}
                            handleSelectPage={handleSelecetedPage}
                            pages={pages}
                            handleSearch={handleSearch}
                            searchVal={searchVal}
                        />
                    }
                />
                <Route path="/counter" element={<Counter />}></Route>
                <Route
                    path="/cart"
                    element={
                        <Cart
                            items={items.filter((itm) => itm.isInCart)}
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                            handleDelete={handleDelete}
                            handleReset={handleReset}
                        />
                    }
                />
                <Route path="/about" element={<About />}>
                    <Route path="company" element={<AboutCompany />} />
                </Route>
                <Route path="/product/:id" element={<Product />} />
                <Route path="/product/new" element={<ProductForm />} />
                //
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </>
    );
}

export default App;
