import { useEffect, useState } from "react";

export default function SearchInput() {
    const data = ["Sate Ayam", "Bakso", "Nasi Goreng", "Mie Ayam", "Rawon"];
    const [input, setInput] = useState('');
    const [newData, setNewData] = useState(data);

    useEffect(() => {
        const keyword = input.toLowerCase();
        const filtered = data.filter(item =>
            item.toLowerCase().includes(keyword)
        );
        setNewData(filtered);
    }, [input]);

    return (
        <>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)} 
            />

            {newData.length === 0 ? (
                <p>Tidak ada menu ditemukan</p>
            ) : (
                <ol>
                    {newData.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            )}
        </>
    );
}
