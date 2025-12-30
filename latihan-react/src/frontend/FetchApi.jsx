import { useEffect, useState } from "react";

export default function FetchApi() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
        setIsLoading(true);
        setError("");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Fetch failed");
        }

        const data = await response.json();
        setList(data);
        } catch {
        setError("Gagal mengambil data");
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        {isLoading && <p>Loading data...</p>}
        {error && <p>{error}</p>}

        {!isLoading && !error && (
            <ol>
            {list.map(item => (
                <li key={item.id}>
                {item.name} <br />
                {item.email}
                </li>
            ))}
            </ol>
        )}
        </>
    );
}
