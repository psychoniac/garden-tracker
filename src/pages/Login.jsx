import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {

    // --------------------------------------------------------
    // États du formulaire
    // --------------------------------------------------------

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Permettra d'afficher un message d'erreur.
    const [error, setError] = useState("")

    // Permettra d'afficher un message pendant la connexion.
    const [loading, setLoading] = useState(false)


    // --------------------------------------------------------
    // Gestion de la soumission du formulaire
    // --------------------------------------------------------

    async function handleSubmit(event) {

        // Empêche le navigateur de recharger la page.
        event.preventDefault()

        setError("")
        setLoading(true)

        // ----------------------------------------------------
        // Demande de connexion à Supabase Auth
        // ----------------------------------------------------

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        // ----------------------------------------------------
        // Si Supabase retourne une erreur
        // ----------------------------------------------------

        if (error) {

            setError(error.message)
            setLoading(false)

            return
        }

        // ----------------------------------------------------
        // Pour l'instant nous allons simplement arrêter le
        // chargement.
        //
        // Nous mettrons ensuite en place la redirection.
        // ----------------------------------------------------

        setLoading(false)
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-100">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">

                <h1 className="text-2xl font-bold">
                    Connexion
                </h1>

                <p className="mt-2 text-stone-500">
                    Connecte-toi à ton jardin.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            className="w-full rounded-lg border border-stone-300 px-4 py-2 outline-none focus:border-green-600"
                        />

                    </div>


                    {/* Mot de passe */}

                    <div>

                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium"
                        >
                            Mot de passe
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            className="w-full rounded-lg border border-stone-300 px-4 py-2 outline-none focus:border-green-600"
                        />

                    </div>


                    {/* Message d'erreur */}

                    {error && (

                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </p>

                    )}


                    {/* Bouton */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white hover:bg-green-800 disabled:opacity-50"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>

                </form>

            </div>

        </div>
    )
}