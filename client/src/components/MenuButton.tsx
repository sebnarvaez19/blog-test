const MenuButton: React.FC = () => {
    return (
        <button className="circle tertiary">
            <i>menu</i>
            <menu className="left no-wrap">
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
                <a>Settings</a>
            </menu>
        </button>
    )
}

export default MenuButton
