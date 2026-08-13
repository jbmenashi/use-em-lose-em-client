import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSignIn } from "@clerk/clerk-react"
import { useState } from "react"

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsSubmitting(true)
    try {
      const res = await signIn.create({ identifier: email, password })

      if (res.createdSessionId) {
        await setActive({ session: res.createdSessionId })
        toast.success("logged in successfully")
        navigate("/")
      } else {
        toast.error("please double check your credentials")
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
    <section className="h-screen grid place-items-center bg-accent">
      <form onSubmit={handleSubmit} className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
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
              "login"
            )}
          </button>
        </div>
        <p className="text-center">
          Not a member yet?
          <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
            register
          </Link>
        </p>
      </form>
    </section>
  )
}
export default Login
