import { useMemo, useState } from "react";

const ORDERS = [
    { id: 1, user: "Aldo", total: 250000, status: "paid" },
    { id: 2, user: "Budi", total: 150000, status: "pending" },
    { id: 3, user: "Citra", total: 500000, status: "paid" },
    { id: 4, user: "Dina", total: 100000, status: "cancelled" },
    { id: 5, user: "Eko", total: 300000, status: "paid" },
    { id: 6, user: "Fahmi", total: 200000, status: "pending" },
];

export default function DerivedState() {
    const [input, setInput] = useState('');
    const [filter, setFilter] =  useState('all');

    const filteredOrders =  useMemo(() => {
        let orders = [...ORDERS];
        
        if(input) {
            orders = orders.filter(a => a.user.toLowerCase().includes(input.toLowerCase()));
        }

        if(filter.toLowerCase() !== 'all') {
            orders = orders.filter(o => o.status === filter.toLowerCase());
        }

        return orders;
    }, [input, filter])

    const orderSummary = useMemo(() => {
        const totalRevenue = filteredOrders
            .filter(o => o.status === "paid")
            .reduce((sum, o) => sum + o.total, 0);

        return {
            totalOrders: filteredOrders.length,
            totalRevenue
        };
    }, [filteredOrders]);



    return(
        <>
            <input type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)} /> <br />
            <select name="" id="" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <ol>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((o) => (
                        <li key={o.id}>Name: {o.user} | Total: {o.total} | Status: {o.status}</li>
                    ))
                ) : (
                    <p>Tidak ada orders</p>
                )}
            </ol>

            <fieldset>
                <legend>Summary box</legend>
                <h4>Total Orders: {orderSummary.totalOrders}</h4>
                <h4>Total Revenue: Rp{orderSummary.totalRevenue.toLocaleString("id-ID")}</h4>
            </fieldset>
        </>
    );
}