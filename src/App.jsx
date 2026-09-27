import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"

import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Plants from "./pages/Plants"
import Journal from "./pages/Journal"
import Gardens from "./pages/Gardens"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UpdatePassword from "./pages/UpdatePassword"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* ------------------------------------------------
                    Page de connexion
                    Elle est indépendante du layout principal.
                ------------------------------------------------ */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/update-password"
          element={<UpdatePassword />}
        />
        <Route
          path="/about"
          element={<About />}
        />

        {/* ------------------------------------------------
                    Application principale
                    Routes Protégées
                ------------------------------------------------ */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>


            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/plants"
              element={<Plants />}
            />

            <Route
              path="/journal"
              element={<Journal />}
            />

            <Route
              path="/gardens"
              element={<Gardens />}
            />

          </Route>
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
