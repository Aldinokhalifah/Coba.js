import { useState } from "react";

const USERS = [
    { id: 1, name: "Aldo", active: true },
    { id: 2, name: "Budi", active: false },
    { id: 3, name: "Citra", active: true },
    { id: 4, name: "Dina", active: false },
    { id: 5, name: "Eko", active: true },
];


export default function UserFilterbyStatus() {
    const [filter, setFilter] = useState("all");
    

    const filteredUsers = USERS.filter(user => {
        if (filter === "active") return user.active;
        if (filter === "inactive") return !user.active;
        return true; // all
    });

    return(
        <>
            <select name="" id="" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <ol>
                {filteredUsers.map(user => (
                    <li key={user.id}>Name: {user.name} || Status: {user.active === true ? 'Active' : 'Inactive'}</li>
                ))}
            </ol>
        </>
        
    );
}