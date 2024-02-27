import HomeButton from "./HomeButton"
import MenuButton from "./MenuButton"
import SearchBar from "./SearchBar"

export default function HeaderBar() {
    return (
        <header>
            <div className="grid">
                <div className="s1 center-align middle align">
                    <HomeButton />
                </div>
                <div className="s10 center-align middle align">
                    <SearchBar />
                </div>
                <div className="s1 center-align middle align">
                    <MenuButton />
                </div>
            </div>
        </header>
    )
}