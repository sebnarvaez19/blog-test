import LoginForm from "../components/LoginForm"

const LoginPage: React.FC = () => {
    return (
        <article className="fill" style={{width: "60vw", margin: "20vw"}}>
            <div className="grid">
                <LoginForm/>
                <div className="s12 center-align middle-align">
                    <span className="small-text">
                    If you don't have an account: <a href="/signup">Sign Up</a>
                    </span>
                </div>
                <div className="s12 center-align middle-align">
                    <span className="small-text">
                    <a href="/">Turn back</a>
                    </span>
                </div>
            </div>
        </article>
    )
}

export default LoginPage
