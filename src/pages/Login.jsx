import SubmitBtn from "../components/SubmitBtn"
import FormInput from "../components/FormInput"
import { Form, Link, redirect, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
// import { loginUser } from "../features/user/userSlice"
// import { useDispatch } from "react-redux"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)
    try {
      const res = await axios.post("http://localhost:8000/auth/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      console.log(res)
      // store.dispatch(loginUser(response.data))
      toast.success("logged in successfully")
      return redirect("/")
    } catch (error) {
      console.log(error)
      const errorMessage = error?.response?.data?.error?.message || "please double check your credentials"

      toast.error(errorMessage)
      return null
    }
  }

const Login = () => {
  return (
    <section className="h-screen grid place-items-center bg-accent">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="username" name="username" defaultValue="jake@jake.com" />
        <FormInput type="password" label="password" name="password" defaultValue="jake" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <p className="text-center">
          Not a member yet?
          <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Login
