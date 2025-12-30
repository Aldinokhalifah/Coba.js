import { useState } from "react";

export default function CounterList() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: 20 }}>
        <input
            type="number"
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            placeholder="Jumlah counter"
        />

        <div style={{ marginTop: 20 }}>
            {Array.from({ length: count }).map((_, index) => (
            <SingleCounter key={index} />
            ))}
        </div>
        </div>
    );
    }

    function SingleCounter() {
    const [value, setValue] = useState(0);

    return (
        <div style={{ marginBottom: 10 }}>
        <span>{value}</span>
        <button onClick={() => setValue(value + 1)}>+1</button>
        <button onClick={() => setValue(0)}>Reset</button>
        </div>
    );
}
