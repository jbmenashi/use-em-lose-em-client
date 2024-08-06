import SubmitBtn from "../components/SubmitBtn"
import FormInput from "../components/FormInput"
import { Form, Link, redirect, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { loginUser } from "../features/user/userSlice"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      const res = await axios.post("http://localhost:8000/auth/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      console.log(res.data.access_token)
      if (res.status === 200) {
        const res2 = await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
          },
        })
        console.log(res2)
        store.dispatch(loginUser(res2.data))
      }
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
        <FormInput type="email" label="username" name="username" />
        <FormInput type="password" label="password" name="password" />
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
