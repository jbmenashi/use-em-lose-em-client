import SubmitBtn from "../components/SubmitBtn"
import FormInput from "../components/FormInput"
import { Form, redirect, Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const res = await axios.post("https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/auth/register", data)
    if (res.status === 201) {
      console.log(res)
      toast.success("Account created successfully; please log in")
      return redirect("/login")
    }
  } catch (error) {
    console.log(error)
    const errorMessage = error?.response?.data?.error?.message || "please double check your credentials"
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center bg-primary">
      <Form method="POST" className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="email" label="email" name="email" />
        {/* <FormInput type="username" label="username" name="username" defaultValue="jake" /> */}
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link to="/login" className="ml-2 link link-hover link-primary capitalize">
            login
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Register
