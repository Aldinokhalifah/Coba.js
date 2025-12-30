import { useEffect, useState } from "react";

export default function TodoList() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");

    // Load data awal
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos) setList(todos);
    }, []);

    const handleAdd = () => {
        if (!input.trim()) return;

        const newList = [...list, input];
        setList(newList);
        localStorage.setItem("todos", JSON.stringify(newList));
        setInput("");
    };

    const handleDelete = (index) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
        localStorage.setItem("todos", JSON.stringify(newList));
    };

    return (
        <>
        <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={handleAdd} style={{ borderColor: "green" }}>
            Tambah
        </button>

        {list.length === 0 ? (
            <p>Belum ada tugas</p>
        ) : (
            <ol>
            {list.map((item, index) => (
                <li key={index}>
                {item}
                <button
                    onClick={() => handleDelete(index)}
                    style={{ borderColor: "red", marginLeft: "8px" }}
                >
                    Hapus
                </button>
                </li>
            ))}
            </ol>
        )}
        </>
    );
}
