import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function ForgotPasswordModal({
    initialEmail = "",
    onClose,
}) {
    const [email, setEmail] = useState(initialEmail)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)
        setError("")
        setMessage("")

        const { error } =
            await supabase.auth.resetPasswordForEmail(
                email,
                {
                    redirectTo:
                        "http://localhost:5173/update-password",
                }
            )

        if (error) {
            console.error(
                "Erreur de réinitialisation :",
                error
            )

            setError(
                "Impossible d'envoyer le lien. Vérifie ton adresse email."
            )

            setLoading(false)
            return
        }

        setMessage(
            "Si un compte correspond à cette adresse, un email contenant un lien de réinitialisation vient d'être envoyé."
        )

        setLoading(false)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-stone-900">
                            Mot de passe oublié ?
                        </h2>

                        <p className="mt-2 text-sm text-stone-500">
                            Entre ton adresse email pour recevoir
                            un lien permettant de choisir un
                            nouveau mot de passe.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 text-xl text-stone-400 hover:text-stone-700"
                        aria-label="Fermer"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="reset-email"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Adresse email
                        </label>

                        <input
                            id="reset-email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            autoFocus
                            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            placeholder="exemple@email.com"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                            {message}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-stone-300 px-4 py-2.5 font-medium text-stone-700 hover:bg-stone-50"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-lg bg-green-700 px-4 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-50"
                        >
                            {loading
                                ? "Envoi..."
                                : "Envoyer le lien"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
