import React from "react";
import { useState } from "react";

export default function Login() {
    // // const ref = useRef();

    const [form, setFormData] = useState({
        email: "",
        password: "",
    });

    //!
    // const [errors, setErrors] = useState({
    //     email: null,
    //     password: null,
    // });

    const handleChange = (e) => {
        const newForm = { ...form };
        newForm[e.target.name] = e.target.value;
        setFormData(newForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);
    };

    return (
        <div className="flex flex-col gap-2 w-1/3 mx-auto mt-10">
            <form action="">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="input input-xs"
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className="input input-xs"
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
                <button onSubmit={handleSubmit} className="btn">
                    Submit
                </button>
            </form>
        </div>
    );
}
