import { useState } from "react"
import { useAuth } from "../auth/AuthProvider"
import { Navigate } from "react-router-dom"

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const auth = useAuth()

    function clickHandle() {
        console.log(username)
        console.log(email)
    }

    if (auth.authenticated) {
        return <Navigate to="/" />
    }

    return (
        <form className="form">
            <div className="grid" style={{width: "56vw"}}>
                <div className="s12 center-align middle-align">
                    <h5>Login</h5>
                </div>
                <div className="s12" />
                <div className="s12 center-align middle-align">
                    <div className=" max field label border">
                        <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        />
                        <label>Username</label>
                    </div>
                </div>
                <div className="s12 center-align middle-align">
                    <div className="field label border">
                        <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                        <label>Email</label>
                    </div>
                </div>
                <div className="s12 center-align middle-align">
                    <button onClick={clickHandle}>
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
