import { useState } from "react";

const USERS = [
    { id: 1, name: "Aldo", role: "admin", active: true },
    { id: 2, name: "Budi", role: "user", active: false },
    { id: 3, name: "Citra", role: "user", active: true },
    { id: 4, name: "Dina", role: "admin", active: false },
    { id: 5, name: "Eko", role: "user", active: true },
];


export default function SimulasiQueryAPI() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");
    const [status, setStatus] = useState("all");

    let result = USERS;

    if (search) {
        result = result.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (role !== "all") {
        result = result.filter(u => u.role === role);
    }

    if (status !== "all") {
        result = result.filter(u =>
        status === "active" ? u.active : !u.active
        );
    }

    const reset = () => {
        setSearch("");
        setRole("all");
        setStatus("all");
    };

    return (
        <>
        <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
        />

        <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select>

        <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>

        {result.length === 0 ? (
            <p>Data tidak ditemukan</p>
        ) : (
            <ol>
            {result.map(user => (
                <li key={user.id}>
                {user.name} | {user.role} | {user.active ? "Active" : "Inactive"}
                </li>
            ))}
            </ol>
        )}

        <button onClick={reset}>Reset</button>
        </>
    );
}
