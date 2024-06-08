import { Link } from "react-router-dom"

const HomeLoggedOut = () => {
  const handleHowItWorks = () => {
    return redirect("/howitworks")
  }

  return (
    <div className="mx-auto max-w-6xl px-8">
      <div className="border-b border-base-300 pb-5 text-center">
        <h1 className="text-4xl font-bold mt-10">Welcome To Use 'Em, Lose 'Em Fantasy Sports!</h1>
      </div>
      <div>
        <div>
          <h4>Learn About How It works</h4>
          <Link to="/howitworks" className="ml-2 link link-hover link-primary capitalize">
            How It works
          </Link>
        </div>
        <div>
          <h4>Create an account</h4>
          <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
            Register
          </Link>
          <Link to="/login" className="ml-2 link link-hover link-primary capitalize">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
export default HomeLoggedOut
