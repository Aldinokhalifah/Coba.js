import { useState } from "react";

const USERS = [
    { id: 1, name: "Aldo", role: "admin", active: true, age: 25 },
    { id: 2, name: "Budi", role: "user", active: false, age: 30 },
    { id: 3, name: "Fahmi", role: "user", active: true, age: 22 },
    { id: 4, name: "Dina", role: "admin", active: false, age: 35 },
    { id: 5, name: "Eko", role: "user", active: true, age: 28 },
    { id: 6, name: "Reja", role: "user", active: true, age: 24 },
    { id: 7, name: "Gita", role: "admin", active: true, age: 40 },
];


export default function UserPagination() {
    const [currentPage, setCurrentPage] = useState(1);  
    const [itemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPage = Math.ceil(USERS.length / itemsPerPage);
    const [sortByName, setSortByName] = useState('asc');
    const [sortByAge, setSortByAge] = useState('youngest');
    
    
    const sortedUsers = [...USERS]
    .sort((a, b) => {
        if (sortByName === 'asc') {
        return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    })
    .sort((a, b) => {
        if (sortByAge === 'youngest') {
        return a.age - b.age; // muda ke tua
        }
        return b.age - a.age; // tua ke muda
    });

    const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);


    return(
        <>

            <select name="" id="" value={sortByName} onChange={(e) => setSortByName(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <br />
            <select name="" id="" value={sortByAge} onChange={(e) => setSortByAge(e.target.value)}>
                <option value="youngest">Youngest</option>
                <option value="oldest">Oldest</option>
            </select>
            <ol>
                {currentItems.map(item => (
                    <li key={item.id}>{item.name} | {item.role} | {item.active === true ? 'Active' : 'Inactive'} | {item.age} Tahun</li>
                ))}
            </ol>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage <= 1}>Sebelumnya</button>
            <span> Halaman {currentPage} dari {totalPage} </span>
            <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage >= totalPage}>Berikutnya</button>
        </>
    );
}