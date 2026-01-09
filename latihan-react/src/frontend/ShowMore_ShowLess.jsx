import { useState } from "react";

const USERS = [
    "Aldo",
    "Budi",
    "Citra",
    "Dina",
    "Eko",
    "Fajar",
    "Gina",
    "Hadi",
];

export default function ShowMoreShowLess() {
    const [visibleCount, setVisibleCount] = useState(3);

    const showMore = () => {
        setVisibleCount(prev => Math.min(prev + 2, USERS.length));
    };

    const showLess = () => {
        setVisibleCount(3);
    };

    const visibleUsers = USERS.slice(0, visibleCount);

    return (
        <>
        <h1>User List</h1>

        <ol>
            {visibleUsers.map(user => (
            <li key={user}>{user}</li>
            ))}
        </ol>

        <button
            onClick={showMore}
            disabled={visibleCount >= USERS.length}
        >
            Show More
        </button>

        <button
            onClick={showLess}
            disabled={visibleCount === 3}
            style={{ marginLeft: "8px" }}
        >
            Show Less
        </button>
        </>
    );
}
