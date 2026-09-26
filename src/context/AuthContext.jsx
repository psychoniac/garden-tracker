import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

// ------------------------------------------------------------
// Création du contexte
// ------------------------------------------------------------

const AuthContext = createContext(null)


// ------------------------------------------------------------
// Provider
//
// Ce composant va fournir les informations d'authentification
// à toute l'application.
// ------------------------------------------------------------

export function AuthProvider({ children }) {

    // Utilisateur actuellement connecté
    const [user, setUser] = useState(null)

    // Permet de savoir si Supabase est encore en train
    // de vérifier la session existante.
    const [loading, setLoading] = useState(true)


    // --------------------------------------------------------
    // Vérification de la session au démarrage
    // --------------------------------------------------------

    useEffect(() => {

        async function getSession() {

            const { data, error } =
                await supabase.auth.getSession()

            if (error) {
                console.error(
                    "Erreur lors de la récupération de la session :",
                    error
                )
            }

            setUser(data.session?.user ?? null)
            setLoading(false)
        }

        getSession()


        // ----------------------------------------------------
        // Écoute des changements d'authentification
        //
        // Exemple :
        // - connexion
        // - déconnexion
        // - expiration de session
        // ----------------------------------------------------

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {

                setUser(session?.user ?? null)

            }
        )


        // ----------------------------------------------------
        // Nettoyage de l'écouteur lorsque le composant
        // est supprimé.
        // ----------------------------------------------------

        return () => {
            subscription.unsubscribe()
        }

    }, [])


    // --------------------------------------------------------
    // Fonction de déconnexion
    // --------------------------------------------------------

    async function logout() {

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error(
                "Erreur lors de la déconnexion :",
                error
            )
        }

    }


    // --------------------------------------------------------
    // Valeurs accessibles dans toute l'application
    // --------------------------------------------------------

    const value = {
        user,
        loading,
        logout,
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


// ------------------------------------------------------------
// Hook personnalisé
//
// Au lieu d'écrire useContext(AuthContext) partout,
// on pourra simplement écrire :
//
// const { user, logout } = useAuth()
// ------------------------------------------------------------

export function useAuth() {

    return useContext(AuthContext)

}