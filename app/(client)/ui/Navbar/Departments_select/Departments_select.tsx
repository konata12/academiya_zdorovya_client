import { use, useEffect, useState } from "react";
import Select from "react-select";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]

export default function Departments_select() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    console.log(data, 1)

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5000/departments'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok((((((((((');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            // setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures it runs once on mount

    console.log(data, 2)

    if (loading) return <p>Loading...</p>

    return <>
        <p>123123123</p>
        <Select options={options} />
    </>
}

