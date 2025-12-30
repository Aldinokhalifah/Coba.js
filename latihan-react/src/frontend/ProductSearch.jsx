import { useState } from "react";

const PRODUCTS = [
    { id: 1, name: "Keyboard", price: 250000 },
    { id: 2, name: "Mouse", price: 150000 },
    { id: 3, name: "Monitor", price: 2000000 },
    { id: 4, name: "Headset", price: 350000 },
    { id: 5, name: "Webcam", price: 500000 },
];

export default function ProductSearch() {
    const [input, setInput] = useState("");

    const filteredProducts = PRODUCTS.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <>
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cari produk..."
        />

        {filteredProducts.length === 0 ? (
            <p>Produk tidak ditemukan</p>
        ) : (
            <ol>
            {filteredProducts.map(item => (
                <li key={item.id}>
                {item.name} - Rp{item.price.toLocaleString("id-ID")}
                </li>
            ))}
            </ol>
        )}
        </>
    );
}
