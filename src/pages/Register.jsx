import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Register() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setError("")
        setMessage("")

        // Vérification des deux mots de passe
        if (password !== confirmPassword) {
            setError(
                "Les deux mots de passe ne correspondent pas."
            )
            return
        }

        // Vérification simple de la longueur
        if (password.length < 6) {
            setError(
                "Le mot de passe doit contenir au moins 6 caractères."
            )
            return
        }

        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            console.error(
                "Erreur lors de l'inscription :",
                error
            )

            setError(
                "Impossible de créer le compte. Vérifie les informations saisies."
            )

            setLoading(false)
            return
        }

        console.log("Compte créé :", data)

        setLoading(false)

        /*
         * Si Supabase demande une confirmation par email,
         * l'utilisateur devra cliquer sur le lien reçu
         * avant de pouvoir se connecter.
         */
        if (!data.session) {
            setMessage(
                "Ton compte a été créé. Vérifie ta boîte mail pour confirmer ton adresse email."
            )

            return
        }

        // Si aucune confirmation email n'est nécessaire,
        // on peut directement aller sur l'accueil.
        navigate("/")
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-stone-900">
                    Créer un compte
                </h1>

                <p className="mt-2 text-stone-500">
                    Crée ton compte pour gérer tes jardins.
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
                            Adresse email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            autoComplete="email"
                            placeholder="exemple@email.com"
                            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-stone-700"
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
                            autoComplete="new-password"
                            placeholder="Minimum 6 caractères"
                            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Confirmation du mot de passe */}
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

                    {/* Message de succès */}
                    {message && (
                        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                            <p>{message}</p>

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="mt-2 font-medium underline"
                            >
                                Retour à la connexion
                            </button>
                        </div>
                    )}

                    {/* Bouton */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white hover:bg-green-800 disabled:opacity-50"
                    >
                        {loading
                            ? "Création du compte..."
                            : "Créer mon compte"}
                    </button>
                </form>

                {/* Retour connexion */}
                <div className="mt-6 border-t border-stone-200 pt-6 text-center">
                    <p className="text-sm text-stone-500">
                        Tu as déjà un compte ?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-2 text-sm font-medium text-green-700 hover:underline"
                    >
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    )
}
