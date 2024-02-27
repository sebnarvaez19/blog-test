import { Outlet } from "react-router-dom"
import HeaderBar from "../components/HeaderBar"

export default function Root() {
    return (
        <>
            <HeaderBar />
            <div>
                <Outlet />
            </div>
        </>
    )
}
