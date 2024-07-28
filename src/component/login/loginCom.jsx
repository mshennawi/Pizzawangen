
import { Toaster } from "react-hot-toast"
import "./LoginCom.css"
import { Link } from "react-router-dom"
import Loginhook from "../../hook/loginhook"

function LoginCom() {

    const [getRegisterInfo, setUserName, setPassword, SendLogin] = Loginhook()

    return (
        <div className="login">
            <h1 className="Page-name">Login</h1>
            <form className="form" onSubmit={SendLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={getRegisterInfo(setUserName)} type="email" id="username" name="username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={getRegisterInfo(setPassword)} type="password" id="password" name="password" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="returnF">
                <Link to={"/ForgetPass"}> <h4 className="return">forget<span>password</span> </h4></Link>
                <Link to={"/Register"}> <h4 className="return">create<span>account</span> </h4></Link>
                <Link to={"/"}> <h4 className="return">return to<span>Home page</span></h4></Link>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default LoginCom