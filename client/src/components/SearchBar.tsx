import { Form } from "react-router-dom"

export default function SearchBar() {
    return (
        <Form id="search-form" role="search">
            <div className="field label prefix border small round" style={{display: "table-cell", verticalAlign: "middle"}}>
                <i>search</i>
                <input id="q" type="search" name="q"/>
                <label>Search</label>
            </div>
        </Form>
    )
}
