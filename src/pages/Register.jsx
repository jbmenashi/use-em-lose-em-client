import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSignUp } from "@clerk/clerk-react"
import { useState } from "react"

const Register = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsSubmitting(true)
    try {
      const res = await signUp.create({ emailAddress: email, password })

      if (res.createdSessionId) {
        await setActive({ session: res.createdSessionId })
        toast.success("Account created successfully")
        navigate("/")
      } else {
        toast.success("Account created; verification may be required before logging in")
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error?.errors?.[0]?.message || "please double check your credentials"
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="h-screen grid place-items-center bg-primary">
      <form onSubmit={handleSubmit} className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text capitalize">email</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text capitalize">password</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-secondary btn-block capitalize" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                sending...
              </>
            ) : (
              "register"
            )}
          </button>
        </div>

        <p className="text-center">
          Already a member?
          <Link to="/login" className="ml-2 link link-hover link-primary capitalize">
            login
          </Link>
        </p>
      </form>
    </section>
  )
}
export default Register
