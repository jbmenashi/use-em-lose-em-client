import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import { store } from "./store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import { ClerkProvider } from "@clerk/clerk-react"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY. Add it to .env and restart the dev server.")
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={publishableKey}>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-center" />
    </Provider>
  </ClerkProvider>
)
