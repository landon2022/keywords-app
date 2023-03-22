import Category from "./Category"
import AddCategory from "./AddCategory"
import { useEffect, useState } from "react"

export function CategoryList({ buttonState }) {

    const [data, setData] = useState([])
    const [updated, setUpdated] = useState(false)

    function handleCategoryUpdate() {
        setUpdated(!updated)
    }

    async function getData() {
        const response = await fetch("http://localhost:5000/records");
        const result = await response.json();
        setData(result)
    }

    useEffect(() => {
        getData()
    }, [updated])

    return (
        <div className="category-container">
            <div className="row categories">
                {data.map(category => <Category key={category._id} id={category._id} name={category.category} content={category.content} buttonState={buttonState} />)}
                <AddCategory buttonState={buttonState} handleCategoryUpdate={handleCategoryUpdate} />
            </div>


        </div>
    )
}