
import { Toaster } from "react-hot-toast"
import "./ForgetPassCom.css"
import { Link } from "react-router-dom"
import ForgetPasshook from "../../hook/forgetPasshook"

function ForgetPassCom() {

    const [getRegisterInfo, setEmail, SendForget] = ForgetPasshook()

    return (
        <div className="login">
            <h1 className="Page-name">Forget Password</h1>
            <form className="form" onSubmit={SendForget}>
                <div className="form-group">
                    <label htmlFor="username">Your Email</label>
                    <input onChange={getRegisterInfo(setEmail)}
                        type="email" id="username" name="username" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="returnF">
                <Link to={"/Register"}> <h4 className="return">return to <span>register</span> </h4></Link>
                <Link to={"/Login"}> <h4 className="return">return to  <span>login</span> </h4></Link>
                <Link to={"/"}> <h4 className="return">return to <span>  Home page</span></h4></Link>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default ForgetPassCom