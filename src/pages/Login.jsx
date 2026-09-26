
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import ForgotPasswordModal from "./ForgotPasswordModal"

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const [showForgotPassword, setShowForgotPassword] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setError("")
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error("Erreur de connexion :", error)

            setError(
                "Impossible de se connecter. Vérifie ton adresse email et ton mot de passe."
            )

            setLoading(false)
            return
        }

        setLoading(false)

        // Pour l'instant, "/" correspond à notre Dashboard.
        // Plus tard, nous pourrons créer une véritable page d'accueil personnalisée.
        navigate("/")
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
                            className="mb-2 block text-sm font-medium text-stone-700"
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
                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-stone-700"
                            >
                                Mot de passe
                            </label>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowForgotPassword(true)
                                }
                                className="text-sm text-green-700 hover:underline"
                            >
                                Mot de passe oublié ?
                            </button>
                        </div>

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

                    {/* Bouton connexion */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white hover:bg-green-800 disabled:opacity-50"
                    >
                        {loading
                            ? "Connexion..."
                            : "Se connecter"}
                    </button>
                </form>

                {/* Inscription */}
                <div className="mt-6 border-t border-stone-200 pt-6 text-center">
                    <p className="text-sm text-stone-500">
                        Tu n'as pas encore de compte ?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="mt-2 text-sm font-medium text-green-700 hover:underline"
                    >
                        Créer un compte
                    </button>
                </div>
            </div>

            {/* Modal mot de passe oublié */}
            {showForgotPassword && (
                <ForgotPasswordModal
                    initialEmail={email}
                    onClose={() =>
                        setShowForgotPassword(false)
                    }
                />
            )}
        </div>
    )
}