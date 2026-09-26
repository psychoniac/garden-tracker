import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute() {

    // --------------------------------------------------------
    // Récupération de l'état d'authentification
    // --------------------------------------------------------

    const { user, loading } = useAuth()


    // --------------------------------------------------------
    // Pendant que Supabase vérifie la session
    //
    // On évite de rediriger trop rapidement vers /login.
    // --------------------------------------------------------

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-stone-500">
                    Vérification de la session...
                </p>
            </div>
        )
    }


    // --------------------------------------------------------
    // Pas d'utilisateur connecté
    //
    // Navigate permet de rediriger vers /login.
    // replace évite d'ajouter la page protégée dans
    // l'historique du navigateur.
    // --------------------------------------------------------

    if (!user) {
        return <Navigate to="/login" replace />
    }


    // --------------------------------------------------------
    // Utilisateur connecté
    //
    // Outlet représente la route enfant qui sera affichée.
    // --------------------------------------------------------

    return <Outlet />
}