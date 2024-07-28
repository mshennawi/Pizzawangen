
import { Toaster } from "react-hot-toast"
import Registerhook from "../../hook/registerhook"
import "./registerCom.css"
import { Link } from "react-router-dom"

function RegisterCom() {

    const [getRegisterInfo, setUserName, setPhoneNumber, setEmail, setPassword, setConfirmPassword,
        setStreet, setSalute, setCity, setPostBox, SendRegister
    ] = Registerhook()

    return (
        <div className="register">
            <h1 className="Page-name">Register</h1>
            <form className="form" onSubmit={SendRegister}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={getRegisterInfo(setUserName)} type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input onChange={getRegisterInfo(setPhoneNumber)} type="tel" id="phoneNumber" name="phoneNumber" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={getRegisterInfo(setEmail)} type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={getRegisterInfo(setPassword)} type="password" id="password" name="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input onChange={getRegisterInfo(setConfirmPassword)} type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input onChange={getRegisterInfo(setStreet)} type="text" id="street" name="street" required />
                </div>
                <div className="form-group">
                    <label htmlFor="salute">salute</label>
                    <input onChange={getRegisterInfo(setSalute)} type="text" id="salute" name="salute" required />
                </div>
                <div className="form-group">
                    <label htmlFor="city">city</label>
                    <input onChange={getRegisterInfo(setCity)} type="text" id="city" name="city" required />
                </div>
                <div className="form-group">
                    <label htmlFor="postBox">postBox</label>
                    <input onChange={getRegisterInfo(setPostBox)} type="text" id="postBox" name="postBox" required />
                </div>
                <button type="submit">Submit</button>

            </form>
            <div className="returnF">
                <Link to={"/Login"}> <h4 className="return">return to <span>login Page</span> </h4></Link>
                <Link to={"/"}> <h4 className="return">return to <span>  Home page</span></h4></Link>

            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default RegisterCom