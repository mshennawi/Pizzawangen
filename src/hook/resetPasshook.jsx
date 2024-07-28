import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ResetPasswrod } from "../reduxTool/AuthSlice"
import toast from "react-hot-toast"
// import { useNavigate } from "react-router-dom"






const ResetPasshook = () => {


    // const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [lo, setLog] = useState(true)

    let tok = localStorage.getItem("token") || ""



    const dispatch = useDispatch()
    const { reset, error } = useSelector((state) => state.Auth)

    const getRegisterInfo = (info) => (e) => {
        info(e.target.value)
    }

    const SendResetPass = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            if (tok !== "") {
                setLog(true)
                await dispatch(ResetPasswrod({
                    email,
                    password,
                    confirmPassword,
                    token: tok
                }))
                setLog(false)
            } else {
                toast.error('Login first')
            }
        } else {
            toast.error('password and confirmPassword are not the same ')
        }

    }






    useEffect(() => {
        // if (!lo) {
        //     if (error === null) {
        //         if (Registeruser.status === 200) {
        //             toast.success("sucess")


        //             setEmail("")
        //             setPassword("")
        //             setConfirmPassword("")
        //             setToken("")
        //             setTimeout(() => {
        //                 navigate("/")
        //             }, 5000);
        //         }
        //     } else {
        //         if (error.message === "User already registed") {
        //             toast.error(error.message)
        //         }
        //         if (error.message === "User did not create") {
        //             toast.error("Change Name ")
        //         }
        //     }
        // }
        // if (tok !== "" || tok !== null) {
        //     setToken(tok)
        //     console.log(tok);
        // }
        console.log(tok);
        console.log(error);
        console.log(reset);

    }, [lo])

    return [getRegisterInfo, setEmail, setPassword, setConfirmPassword, SendResetPass]


}

export default ResetPasshook