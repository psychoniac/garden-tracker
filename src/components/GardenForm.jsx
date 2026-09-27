import { useState } from "react"

import FormField from "./forms/FormField"
import Button from "./Button"
import FormErrorModal from "./modals/FormErrorModal"

import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

export default function GardenForm({
    garden = null,
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
    // Si "garden" existe, nous sommes en mode modification. 
    // Les champs sont alors préremplis avec ses données.
    // --------------------------------------------------------
    const [name, setName] = useState(garden?.name ?? "")
    const [startDate, setStartDate] = useState(garden?.start_date ?? "")
    const [fertilizer, setFertilizer] = useState(garden?.fertilizer ?? "")
    const [potSize, setPotSize] = useState(garden?.pot_size ?? "")
    const [plantCount, setPlantCount] = useState(garden?.plant_count ?? "")
    const [varieties, setVarieties] = useState(garden?.varieties ?? "")
    const [cultivationType, setCultivationType] = useState(garden?.cultivation_type ?? "")
    const [soilType, setSoilType] = useState(garden?.soil_type ?? "")
    // -------------------------------------------------------- 
    // États du formulaire 
    // -------------------------------------------------------- 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)
    // -------------------------------------------------------- 
    // Validation du formulaire
    // --------------------------------------------------------
    function validateForm() {
        if (!name.trim()) {
            return "Le nom du jardin est obligatoire."
        }
        if (!startDate) {
            return "La date de démarrage est obligatoire."
        }
        if (!plantCount || Number(plantCount) <= 0 || !Number.isInteger(Number(plantCount))) {
            return ("Le nombre de plantes doit être un entier supérieur à 0.")
        }
        if (!varieties.trim()) {
            return ("Tu dois indiquer au moins une variété.")
        }
        if (!cultivationType) {
            return ("Indique si les plantes proviennent de graines ou de clones.")
        }
        if (!soilType.trim()) {
            return ("Le type de terre est obligatoire.")
        }
        if (potSize !== "" && Number(potSize) <= 0) {
            return ("La taille des pots doit être supérieure à 0.")
        }
        return null
    }
    // -------------------------------------------------------- 
    // Soumission du formulaire
    // -------------------------------------------------------- 
    async function handleSubmit(event) {
        event.preventDefault()

        setError("")

        // ---------------------------------------------------- 
        //  Vérification des champs
        //  ----------------------------------------------------

        const validationError = validateForm()

        if (validationError) {
            setError(validationError)
            setShowErrorModal(true)

            return
        }

        // ---------------------------------------------------- 
        //  Vérification de la connexion 
        //  ----------------------------------------------------

        if (!user) {
            setError(
                "Tu dois être connecté pour enregistrer un jardin."
            )

            setShowErrorModal(true)

            return
        }

        setLoading(true)

        // ----------------------------------------------------
        // Préparation des données destinées à Supabase 
        // --------------------------------------------------- 

        const gardenData = {
            name: name.trim(),
            start_date: startDate,
            fertilizer: fertilizer.trim() || null,
            pot_size: potSize !== "" ? Number(potSize) : null,
            plant_count: Number(plantCount),
            varieties: varieties.trim(),
            cultivation_type: cultivationType,
            soil_type: soilType.trim(),
        }

        let response

        // ---------------------------------------------------- 
        //  MODE MODIFICATION 
        //  ----------------------------------------------------

        if (garden) {
            response = await supabase
                .from("gardens")
                .update(gardenData)
                .eq("id", garden.id)
                .select()
                .single()
        }

        // ---------------------------------------------------- 
        //  MODE CRÉATION
        //  ---------------------------------------------------- 

        else {
            response = await supabase
                .from("gardens")
                .insert({
                    ...gardenData,
                    user_id: user.id,
                })
                .select()
                .single()
        }

        // ----------------------------------------------------
        // Gestion de l'erreur Supabase
        // ----------------------------------------------------

        if (response.error) {
            console.error(
                "Erreur lors de l'enregistrement du jardin :",
                response.error
            )

            setError(
                "Impossible d'enregistrer le jardin. Vérifie les informations puis réessaie."
            )

            setShowErrorModal(true)
            setLoading(false)

            return
        }

        // ----------------------------------------------------
        // Sauvegarde réussie 
        // ---------------------------------------------------- 

        setLoading(false)

        // Le composant parent récupère le jardin créé 
        //  ou modifié. 

        if (onSaved) {
            onSaved(response.data)
        }
    }
    // --------------------------------------------------------
    //  Affichage 
    // --------------------------------------------------------

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* ------------------------------------------------
                     Nom du jardin
                ------------------------------------------------ */}
                <FormField
                    label="Nom du jardin / session"
                    name="name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Ex : Session septembre 2026"
                    required
                />

                {/* ------------------------------------------------
                    Date de démarrage 
                ------------------------------------------------ */}
                <FormField
                    label="Date de démarrage"
                    name="startDate"
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                        setStartDate(event.target.value)
                    }
                    required
                />

                {/* ------------------------------------------------
                     Engrais 
                ------------------------------------------------ */}
                <FormField
                    label="Engrais utilisé"
                    name="fertilizer"
                    value={fertilizer}
                    onChange={(event) =>
                        setFertilizer(event.target.value)
                    }
                    placeholder="Ex : Bio Grow"
                />

                {/* ------------------------------------------------
                     Taille des pots
                ------------------------------------------------ */}
                <FormField
                    label="Taille des pots"
                    name="potSize"
                    type="number"
                    value={potSize}
                    onChange={(event) =>
                        setPotSize(event.target.value)
                    }
                    placeholder="Ex : 11"
                />

                {/* ------------------------------------------------
                     Nombre de plantes 
                ------------------------------------------------ */}
                <FormField
                    label="Nombre de plantes"
                    name="plantCount"
                    type="number"
                    value={plantCount}
                    onChange={(event) =>
                        setPlantCount(event.target.value)
                    }
                    placeholder="Ex : 6"
                    required
                />

                {/* ------------------------------------------------
                     Variétés 
                ------------------------------------------------ */}
                <FormField
                    label="Variétés utilisées"
                    name="varieties"
                    value={varieties}
                    onChange={(event) =>
                        setVarieties(event.target.value)
                    }
                    placeholder="Ex : Variété A, Variété B"
                    required
                />

                {/* ------------------------------------------------
                     Graines / clones 
                ------------------------------------------------ */}
                <div>
                    <label
                        htmlFor="cultivationType"
                        className="mb-2 block text-sm font-medium text-stone-700"
                    >
                        Origine des plantes

                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    </label>

                    <select
                        id="cultivationType"
                        name="cultivationType"
                        value={cultivationType}
                        onChange={(event) =>
                            setCultivationType(
                                event.target.value
                            )
                        }
                        required
                        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 outline-none transition focus:border-green-600"
                    >
                        <option value="">
                            Sélectionner
                        </option>
                        <option value="graines">
                            Graines
                        </option>
                        <option value="clone">
                            Clones
                        </option>
                    </select>
                </div>

                {/* ------------------------------------------------
                     Type de terre 
                ------------------------------------------------ */}
                <FormField
                    label="Type de terre"
                    name="soilType"
                    value={soilType}
                    onChange={(event) =>
                        setSoilType(event.target.value)
                    }
                    placeholder="Ex : Terreau universel"
                    required
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
                            : garden
                                ? "Enregistrer les modifications"
                                : "Créer le jardin"}
                    </Button>
                </div>
            </form>

            {/* ---------------------------------------------------- 
                Modale d'erreur 
            ---------------------------------------------------- */}

            {showErrorModal && (
                <FormErrorModal
                    title="Impossible d'enregistrer le jardin"
                    message={error}
                    onCancel={() => {
                        // Ferme la modale d'erreur
                        setShowErrorModal(false)

                        // Si le parent nous fournit onCancel,
                        // on ferme également le formulaire.

                        if (onCancel) {
                            onCancel()
                        }
                    }}
                    onContinue={() => {
                        // Ferme uniquement la modale d'erreur.
                        // Le formulaire reste ouvert avec les infos deja saisies.

                        setShowErrorModal(false)
                    }}
                />
            )}
        </>
    )
}
