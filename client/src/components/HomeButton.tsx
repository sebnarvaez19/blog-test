import { Link } from "react-router-dom"

export default function HomeButton() {
    return (
        <Link to={"/"}>
            <button className="circle transparent">
                <i>home</i>
            </button>
        </Link>
    )
}
