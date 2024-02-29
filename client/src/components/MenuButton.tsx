const MenuButton: React.FC = () => {
    return (
        <button className="circle tertiary">
            <i>menu</i>
            <menu className="left no-wrap">
                <a>Login</a>
                <a>Sign Up</a>
                <a>Settings</a>
            </menu>
        </button>
    )
}

export default MenuButton
