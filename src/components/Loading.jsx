import React from "react"
import football from "../assets/football.png"

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={football} alt="Loading..." className="animate-spin w-24 h-24" />
    </div>
  )
}

export default Loading
