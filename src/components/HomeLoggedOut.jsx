import { Link } from "react-router-dom"

const HomeLoggedOut = () => {
  const handleHowItWorks = () => {
    return redirect("/howitworks")
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <div className="text-center">
        <p className="text-5xl font-bold mb-10">Welcome To Use 'Em, Lose 'Em Fantasy Sports!</p>
        <div>
          <Link to="/register" className="ml-2 text-4xl font-semibold link link-hover link-primary capitalize">
            Register
          </Link>
          <p className="mt-2 text-3xl font-semibold">Or</p>
          <Link to="/login" className="ml-2 text-4xl font-semibold link link-hover link-primary capitalize">
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}
export default HomeLoggedOut
