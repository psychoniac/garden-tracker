import { useEffect, useState } from "react"

import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

import PlantForm from "../components/PlantForm"
import Modal from "../components/modals/Modal"

export default function Plants() {
    // --------------------------------------------------------
    // Utilisateur connecté
    // --------------------------------------------------------

    const { user } = useAuth()

    // --------------------------------------------------------
    // Liste des génétiques personnelles
    // --------------------------------------------------------

    const [plants, setPlants] = useState([])

    // --------------------------------------------------------
    // États
    // --------------------------------------------------------

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    // --------------------------------------------------------
    // Gestion de la modale
    // --------------------------------------------------------

    const [showPlantForm, setShowPlantForm] =
        useState(false)

    // --------------------------------------------------------
    // Génétique actuellement modifiée
    // --------------------------------------------------------

    const [editingPlant, setEditingPlant] =
        useState(null)

    // --------------------------------------------------------
    // Récupération des génétiques
    // --------------------------------------------------------

    useEffect(() => {
        async function fetchPlants() {
            if (!user) {
                setLoading(false)
                return
            }

            setLoading(true)
            setError("")

            const {
                data,
                error,
            } = await supabase
                .from("plant_varieties")
                .select("*")
                .order("created_at", {
                    ascending: false,
                })

            if (error) {
                console.error(
                    "Erreur lors du chargement des plantes :",
                    error
                )

                setError(
                    "Impossible de charger ta galerie de plantes."
                )

                setLoading(false)
                return
            }

            setPlants(data || [])
            setLoading(false)
        }

        fetchPlants()
    }, [user])

    // --------------------------------------------------------
    // Ouvrir la création
    // --------------------------------------------------------

    function handleNewPlant() {
        setEditingPlant(null)
        setShowPlantForm(true)
    }

    // --------------------------------------------------------
    // Ouvrir la modification
    // --------------------------------------------------------

    function handleEditPlant(plant) {
        setEditingPlant(plant)
        setShowPlantForm(true)
    }

    // --------------------------------------------------------
    // Sauvegarde
    // --------------------------------------------------------

    function handleSaved(savedPlant) {
        // Modification d'une plante existante

        if (editingPlant) {
            setPlants((currentPlants) =>
                currentPlants.map((plant) =>
                    plant.id === savedPlant.id
                        ? savedPlant
                        : plant
                )
            )
        }

        // Création d'une nouvelle plante

        else {
            setPlants((currentPlants) => [
                savedPlant,
                ...currentPlants,
            ])
        }

        setEditingPlant(null)
        setShowPlantForm(false)
    }

    // --------------------------------------------------------
    // Chargement
    // --------------------------------------------------------

    if (loading) {
        return (
            <div className="p-8">
                <h2 className="text-3xl font-bold">
                    Mes plantes
                </h2>

                <p className="mt-4 text-stone-500">
                    Chargement de ta galerie...
                </p>
            </div>
        )
    }

    // --------------------------------------------------------
    // Erreur
    // --------------------------------------------------------

    if (error) {
        return (
            <div className="p-8">
                <h2 className="text-3xl font-bold">
                    Mes plantes
                </h2>

                <p className="mt-4 text-red-600">
                    {error}
                </p>
            </div>
        )
    }

    // --------------------------------------------------------
    // Affichage
    // --------------------------------------------------------

    return (
        <div className="p-8">
            {/* ------------------------------------------------
                En-tête
            ------------------------------------------------ */}

            <div className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Mes plantes
                        </h2>

                        <p className="mt-2 text-stone-500">
                            Ta galerie personnelle de génétiques.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleNewPlant}
                        className="rounded-lg bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-800"
                    >
                        + Nouvelle plante
                    </button>
                </div>
            </div>

            {/* ------------------------------------------------
                Galerie vide
            ------------------------------------------------ */}

            {plants.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center">
                    <p className="text-stone-500">
                        Aucune génétique enregistrée pour le
                        moment.
                    </p>

                    <button
                        type="button"
                        onClick={handleNewPlant}
                        className="mt-4 rounded-lg bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-800"
                    >
                        Créer ma première plante
                    </button>
                </div>
            ) : (
                /* ------------------------------------------------
                   Galerie
                ------------------------------------------------ */

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {plants.map((plant) => (
                        <article
                            key={plant.id}
                            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <h3 className="text-xl font-semibold text-stone-900">
                                    🌱 {plant.name}
                                </h3>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-800">
                                    {plant.type}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm text-stone-600">
                                <p>
                                    <span className="font-medium">
                                        Breeder :
                                    </span>{" "}
                                    {plant.breeder}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Floraison :
                                    </span>{" "}
                                    {plant.flowering_days} jours
                                </p>

                                {plant.yield_g_m2 && (
                                    <p>
                                        <span className="font-medium">
                                            Rendement :
                                        </span>{" "}
                                        {plant.yield_g_m2} g/m²
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                                <a
                                    href={plant.seedfinder_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-medium text-green-700 hover:text-green-800"
                                >
                                    Voir sur Seedfinder ↗
                                </a>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEditPlant(plant)
                                    }
                                    className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                                >
                                    Modifier
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* ------------------------------------------------
                Modale création / modification
            ------------------------------------------------ */}

            {showPlantForm && (
                <Modal
                    title={
                        editingPlant
                            ? "Modifier la plante"
                            : "Nouvelle plante"
                    }
                    onClose={() => {
                        setShowPlantForm(false)
                        setEditingPlant(null)
                    }}
                >
                    <PlantForm
                        plant={editingPlant}
                        onSaved={handleSaved}
                        onCancel={() => {
                            setShowPlantForm(false)
                            setEditingPlant(null)
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}