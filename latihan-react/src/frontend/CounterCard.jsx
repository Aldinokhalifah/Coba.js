import { useState, useEffect } from "react"


export default function CounterCard() {
    const [count, setCount] = useState(0)
    
      // Ambil dari localStorage sekali saat pertama render
        useEffect(() => {
            const saved = localStorage.getItem('count')
            if (saved !== null) {
            setCount(parseInt(saved))
            }
        }, [])
        
        const handlePlus = () => {
            const newCount = count + 1
            setCount(newCount)
            localStorage.setItem('count', newCount)
        }
        
        const handleMin = () => {
            const newCount = count - 1
            setCount(newCount)
            localStorage.setItem('count', newCount)
        }
        
        const handleReset = () => {
            setCount(0)
            localStorage.removeItem('count')
        }
        
        return (
            <>
            <h1>{count}</h1>
            <button onClick={handlePlus} style={{borderColor: 'green'}}>Tambah</button>
            <button onClick={handleMin} style={{borderColor: 'red'}}>Kurang</button>
            <button onClick={handleReset} style={{borderColor: 'yellow'}}>Reset</button>
            </>
    )
}