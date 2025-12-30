import { useState } from "react";

export default function FormValidation() {
    const [form, setForm] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const validate = () => {
        let newErr = {};

        if (form.name.trim().length < 3) {
            newErr.name = "Nama minimal 3 karakter";
        }

        if (!form.email.includes("@") || !form.email.includes(".")) {
            newErr.email = "Email harus mengandung @ dan .";
        }

        setErrors(newErr);

        return Object.keys(newErr).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setSuccess(`Data berhasil dikirim: ${form.name} - ${form.email}`);
        } else {
            setSuccess("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <label>Nama:</label>
            <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

            <label>Email:</label>
            <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <button type="submit">Submit</button>

            {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
    );
}
