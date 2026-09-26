import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Dashboard from "./pages/Dashboard"
import Plants from "./pages/Plants"
import Journal from "./pages/Journal"
import Photos from "./pages/Photos"
import Login from "./pages/Login"
import Gardens from "./pages/Gardens"
import ProtectedRoute from "./components/ProtectedRoute"
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

        {/* ------------------------------------------------
                    Application principale
                    Routes Protégées
                ------------------------------------------------ */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/plants"
              element={<Plants />}
            />

            <Route
              path="/journal"
              element={<Journal />}
            />

            <Route
              path="/photos"
              element={<Photos />}
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
