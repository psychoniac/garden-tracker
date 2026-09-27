import { useState } from "react"

import FormField from "./forms/FormField"
import Button from "./Button"
import FormErrorModal from "./modals/FormErrorModal"

import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

export default function PlantForm({
    plant = null,
    onSaved,
    onCancel,
}) {
    // --------------------------------------------------------
    // Utilisateur connecté
    // --------------------------------------------------------

    const { user } = useAuth()

    // --------------------------------------------------------
    // Valeurs du formulaire
    //
    // Si "plant" existe, nous sommes en mode modification.
    // --------------------------------------------------------

    const [name, setName] = useState(
        plant?.name ?? ""
    )

    const [type, setType] = useState(
        plant?.type ?? ""
    )

    const [floweringDays, setFloweringDays] =
        useState(
            plant?.flowering_days ?? ""
        )

    const [breeder, setBreeder] = useState(
        plant?.breeder ?? ""
    )

    const [seedfinderUrl, setSeedfinderUrl] =
        useState(
            plant?.seedfinder_url ?? ""
        )

    const [yieldGm2, setYieldGm2] = useState(
        plant?.yield_g_m2 ?? ""
    )

    // --------------------------------------------------------
    // États du formulaire
    // --------------------------------------------------------

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")

    const [showErrorModal, setShowErrorModal] =
        useState(false)

    // --------------------------------------------------------
    // Validation
    // --------------------------------------------------------

    function validateForm() {
        if (!name.trim()) {
            return (
                "Le nom de la génétique est obligatoire."
            )
        }

        if (!type) {
            return (
                "Tu dois sélectionner le type de génétique."
            )
        }

        if (
            !floweringDays ||
            Number(floweringDays) <= 0
        ) {
            return (
                "La durée de floraison doit être supérieure à 0 jour."
            )
        }

        if (!breeder.trim()) {
            return (
                "Le nom du breeder est obligatoire."
            )
        }

        if (!seedfinderUrl.trim()) {
            return (
                "Le lien vers Seedfinder est obligatoire."
            )
        }

        // ----------------------------------------------------
        // Vérification de l'URL Seedfinder
        // ----------------------------------------------------

        try {
            const url = new URL(seedfinderUrl)

            if (
                url.protocol !== "http:" &&
                url.protocol !== "https:"
            ) {
                return (
                    "Le lien Seedfinder doit être une URL valide."
                )
            }
        } catch {
            return (
                "Le lien Seedfinder doit être une URL valide."
            )
        }

        // ----------------------------------------------------
        // Rendement facultatif
        // ----------------------------------------------------

        if (
            yieldGm2 !== "" &&
            Number(yieldGm2) <= 0
        ) {
            return (
                "Le rendement doit être supérieur à 0."
            )
        }

        return null
    }

    // --------------------------------------------------------
    // Envoi du formulaire
    // --------------------------------------------------------

    async function handleSubmit(event) {
        event.preventDefault()

        setError("")

        // ----------------------------------------------------
        // Validation
        // ----------------------------------------------------

        const validationError = validateForm()

        if (validationError) {
            setError(validationError)
            setShowErrorModal(true)

            return
        }

        // ----------------------------------------------------
        // Vérification connexion
        // ----------------------------------------------------

        if (!user) {
            setError(
                "Tu dois être connecté pour enregistrer une génétique."
            )

            setShowErrorModal(true)

            return
        }

        setLoading(true)

        // ----------------------------------------------------
        // Données envoyées à Supabase
        // ----------------------------------------------------

        const plantData = {
            name: name.trim(),

            type,

            flowering_days:
                Number(floweringDays),

            breeder:
                breeder.trim(),

            seedfinder_url:
                seedfinderUrl.trim(),

            yield_g_m2:
                yieldGm2 !== ""
                    ? Number(yieldGm2)
                    : null,
        }

        let response

        // ----------------------------------------------------
        // MODIFICATION
        // ----------------------------------------------------

        if (plant) {
            response = await supabase
                .from("plant_varieties")
                .update(plantData)
                .eq("id", plant.id)
                .select()
                .single()
        }

        // ----------------------------------------------------
        // CRÉATION
        // ----------------------------------------------------

        else {
            response = await supabase
                .from("plant_varieties")
                .insert({
                    ...plantData,
                    user_id: user.id,
                })
                .select()
                .single()
        }

        // ----------------------------------------------------
        // Erreur Supabase
        // ----------------------------------------------------

        if (response.error) {
            console.error(
                "Erreur lors de l'enregistrement de la génétique :",
                response.error
            )

            setError(
                "Impossible d'enregistrer cette génétique."
            )

            setShowErrorModal(true)
            setLoading(false)

            return
        }

        // ----------------------------------------------------
        // Succès
        // ----------------------------------------------------

        setLoading(false)

        if (onSaved) {
            onSaved(response.data)
        }
    }

    // --------------------------------------------------------
    // Affichage
    // --------------------------------------------------------

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* ------------------------------------------------
                    Nom
                ------------------------------------------------ */}

                <FormField
                    label="Nom de la génétique"
                    name="name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Ex : Blue Dream"
                    required
                />

                {/* ------------------------------------------------
                    Type
                ------------------------------------------------ */}

                <div>
                    <label
                        htmlFor="type"
                        className="mb-2 block text-sm font-medium text-stone-700"
                    >
                        Type
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    </label>

                    <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={(event) =>
                            setType(event.target.value)
                        }
                        required
                        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 outline-none transition focus:border-green-600"
                    >
                        <option value="">
                            Sélectionner
                        </option>

                        <option value="indica">
                            Indica
                        </option>

                        <option value="sativa">
                            Sativa
                        </option>
                    </select>
                </div>

                {/* ------------------------------------------------
                    Durée de floraison
                ------------------------------------------------ */}

                <FormField
                    label="Durée de floraison (jours)"
                    name="floweringDays"
                    type="number"
                    value={floweringDays}
                    onChange={(event) =>
                        setFloweringDays(
                            event.target.value
                        )
                    }
                    placeholder="Ex : 63"
                    required
                />

                {/* ------------------------------------------------
                    Breeder
                ------------------------------------------------ */}

                <FormField
                    label="Breeder"
                    name="breeder"
                    value={breeder}
                    onChange={(event) =>
                        setBreeder(event.target.value)
                    }
                    placeholder="Ex : Breeder XYZ"
                    required
                />

                {/* ------------------------------------------------
                    Seedfinder
                ------------------------------------------------ */}

                <FormField
                    label="Lien vers Seedfinder"
                    name="seedfinderUrl"
                    type="url"
                    value={seedfinderUrl}
                    onChange={(event) =>
                        setSeedfinderUrl(
                            event.target.value
                        )
                    }
                    placeholder="https://..."
                    required
                />

                {/* ------------------------------------------------
                    Rendement
                ------------------------------------------------ */}

                <FormField
                    label="Rendement (g/m²)"
                    name="yieldGm2"
                    type="number"
                    value={yieldGm2}
                    onChange={(event) =>
                        setYieldGm2(
                            event.target.value
                        )
                    }
                    placeholder="Ex : 500"
                />

                {/* ------------------------------------------------
                    Boutons
                ------------------------------------------------ */}

                <div className="flex gap-3 pt-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="rounded-lg border border-stone-300 px-4 py-2.5 font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Annuler
                        </button>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Enregistrement..."
                            : plant
                                ? "Enregistrer les modifications"
                                : "Créer la plante"}
                    </Button>
                </div>
            </form>

            {/* ----------------------------------------------------
                Modale d'erreur
            ---------------------------------------------------- */}

            {showErrorModal && (
                <FormErrorModal
                    title="Impossible d'enregistrer la plante"
                    message={error}
                    onCancel={() => {
                        setShowErrorModal(false)

                        if (onCancel) {
                            onCancel()
                        }
                    }}
                    onContinue={() => {
                        setShowErrorModal(false)
                    }}
                />
            )}
        </>
    )
}