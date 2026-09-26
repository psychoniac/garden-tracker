import { useState } from "react"

import FormField from "./forms/FormField"
import Button from "./Button"

import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"


export default function GardenForm({ onCreated }) {

    // --------------------------------------------------------
    // Récupération de l'utilisateur connecté
    // --------------------------------------------------------

    const { user } = useAuth()


    // --------------------------------------------------------
    // Valeur du champ "nom"
    // --------------------------------------------------------

    const [name, setName] = useState("")


    // --------------------------------------------------------
    // État du formulaire
    // --------------------------------------------------------

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")


    // --------------------------------------------------------
    // Soumission du formulaire
    // --------------------------------------------------------

    async function handleSubmit(event) {

        event.preventDefault()

        setError("")
        setLoading(true)


        // ----------------------------------------------------
        // Vérification supplémentaire
        // ----------------------------------------------------

        if (!user) {

            setError(
                "Tu dois être connecté pour créer un jardin."
            )

            setLoading(false)

            return
        }


        // ----------------------------------------------------
        // Insertion dans Supabase
        // ----------------------------------------------------

        const {
            data,
            error,
        } = await supabase
            .from("gardens")
            .insert({
                name: name,
                user_id: user.id,
            })
            .select()
            .single()


        // ----------------------------------------------------
        // Gestion de l'erreur Supabase
        // ----------------------------------------------------

        if (error) {

            console.error(
                "Erreur lors de la création du jardin :",
                error
            )

            setError(
                "Impossible de créer le jardin."
            )

            setLoading(false)

            return
        }


        // ----------------------------------------------------
        // Création réussie
        // ----------------------------------------------------

        console.log(
            "Jardin créé :",
            data
        )


        // On vide le formulaire
        setName("")

        setLoading(false)


        // ----------------------------------------------------
        // On prévient le composant parent
        // qu'un jardin vient d'être créé.
        // ----------------------------------------------------

        if (onCreated) {
            onCreated(data)
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <FormField
                label="Nom du jardin"
                name="name"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
                placeholder="Ex : Mon jardin intérieur"
                required
            />


            {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </p>
            )}


            <Button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Création..."
                    : "Créer le jardin"
                }
            </Button>

        </form>
    )
}