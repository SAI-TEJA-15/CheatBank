import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { CheatSheetProvider } from "./contexts/CheatSheetContext.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CheatSheetProvider>
          <App />
        </CheatSheetProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
