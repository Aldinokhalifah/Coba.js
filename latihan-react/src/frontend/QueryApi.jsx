import { useCallback, useMemo, useState } from "react";

const USERS = [
    { id: 1, name: "Aldo", role: "admin", active: true, age: 25 },
    { id: 2, name: "Budi", role: "user", active: false, age: 30 },
    { id: 3, name: "Fahmi", role: "user", active: true, age: 22 },
    { id: 4, name: "Dina", role: "admin", active: false, age: 35 },
    { id: 5, name: "Eko", role: "user", active: true, age: 28 },
    { id: 6, name: "Reja", role: "user", active: true, age: 24 },
    { id: 7, name: "Gita", role: "admin", active: true, age: 40 },
];


export default function QueryApi() {
    const [currentPage, setCurrentPage] = useState(1);  
    const [itemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [sortByName, setSortByName] = useState('asc');
    const [sortByAge, setSortByAge] = useState('youngest');
    const [input, setInput] = useState('');
    
    const processedUsers = useMemo(() => {
        let result = [...USERS];

        // search
        if (input) {
            result = result.filter(u =>
            u.name.toLowerCase().includes(input.toLowerCase()) ||
            u.role.toLowerCase().includes(input.toLowerCase())
            );
        }

        // sort name
        result = result.sort((a, b) =>
            sortByName === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );

        // sort age
        result = result.sort((a, b) =>
            sortByAge === 'youngest'
            ? a.age - b.age
            : b.age - a.age
        );

        return result;
    }, [input, sortByName, sortByAge]);

    
    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => prev + 1);
    }, []);

    const handlePreviousPage = useCallback(() => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }, []);


    const currentItems = useMemo(() => {
        return processedUsers.slice(indexOfFirstItem, indexOfLastItem);
    }, [processedUsers, indexOfFirstItem, indexOfLastItem]);
    const totalPage = Math.ceil(processedUsers.length / itemsPerPage);


    return(
        <>

            <input type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)} /> <br />
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
            <button onClick={handlePreviousPage} disabled={currentPage <= 1}>Sebelumnya</button>
            <span> Halaman {currentPage} dari {totalPage} </span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPage}>Berikutnya</button>
        </>
    );
}