
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ForgetPasswrod } from "../reduxTool/AuthSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function ForgetPasshook() {
    const [email, setEmail] = useState("")
    const [lo, setLog] = useState(true)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { forget, error } = useSelector((state) => state.Auth)

    const getRegisterInfo = (info) => (e) => {
        info(e.target.value)
    }

    const SendForget = async (e) => {
        e.preventDefault()
        if (email !== "") {
            setLog(true)
            await dispatch(ForgetPasswrod(
                email
            ))
            setLog(false)
        }
    }

    useEffect(() => {
        if (!lo) {
            if (error === null) {
                if (forget && forget.data) {
                    if (forget.data.message === "Reset password URL has been sent to the email successfully!") {
                        toast.success("check your email")
                        setEmail("")
                        setTimeout(() => {
                            navigate("/Login")
                        }, 1000);
                    }
                }
            } else {
                toast.error("email is false")
            }
        }

    }, [lo])

    return [getRegisterInfo, setEmail, SendForget]
}





export default ForgetPasshook