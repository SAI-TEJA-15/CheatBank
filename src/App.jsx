import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import HomePage from "./pages/HomePage"
import CheatSheetViewer from "./pages/CheatSheetViewer"
import CheatSheetEditor from "./pages/CheatSheetEditor"
import SearchResults from "./pages/SearchResults"
import UserProfile from "./pages/UserProfile"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFound from "./pages/NotFound"

/**
 * Main App component with routing configuration
 * Handles all application routes and wraps them in the main layout
 */
function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cheatsheet/:id" element={<CheatSheetViewer />} />
          <Route path="create" element={<CheatSheetEditor />} />
          <Route path="edit/:id" element={<CheatSheetEditor />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
