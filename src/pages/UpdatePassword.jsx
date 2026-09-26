import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function UpdatePassword() {
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] =
        useState("")

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setError("")
        setMessage("")

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            setError(
                "Les deux mots de passe ne correspondent pas."
            )
            return
        }

        if (password.length < 6) {
            setError(
                "Le mot de passe doit contenir au moins 6 caractères."
            )
            return
        }

        setLoading(true)

        const { error } = await supabase.auth.updateUser({
            password,
        })

        if (error) {
            console.error(
                "Erreur lors de la modification du mot de passe :",
                error
            )

            setError(
                "Impossible de modifier le mot de passe. Le lien est peut-être expiré."
            )

            setLoading(false)
            return
        }

        setLoading(false)

        setMessage(
            "Ton mot de passe a été modifié avec succès."
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-stone-900">
                    Nouveau mot de passe
                </h1>

                <p className="mt-2 text-stone-500">
                    Choisis ton nouveau mot de passe.
                </p>

                {!message ? (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >
                        {/* Nouveau mot de passe */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-stone-700"
                            >
                                Nouveau mot de passe
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                required
                                autoComplete="new-password"
                                placeholder="Minimum 6 caractères"
                                className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Confirmation */}
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="mb-2 block text-sm font-medium text-stone-700"
                            >
                                Confirmer le mot de passe
                            </label>

                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                required
                                autoComplete="new-password"
                                placeholder="Répète ton mot de passe"
                                className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Erreur */}
                        {error && (
                            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white hover:bg-green-800 disabled:opacity-50"
                        >
                            {loading
                                ? "Modification..."
                                : "Modifier mon mot de passe"}
                        </button>
                    </form>
                ) : (
                    <div className="mt-8">
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                            {message}
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-4 w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white hover:bg-green-800"
                        >
                            Accéder à mon jardin
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sm text-green-700 hover:underline"
                    >
                        Retour à la connexion
                    </button>
                </div>
            </div>
        </div>
    )
}
