import { useState } from "react"
import FormField from "./forms/FormField"
import Button from "./Button"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import { useGarden } from "../context/GardenContext"
import FormErrorModal from "./modals/FormErrorModal"

export default function PlantForm({ plant = null, onSaved, }) {
    const { user } = useAuth()
    const { selectedGarden } = useGarden()
    const [name, setName] = useState(plant?.name || "")
    const [variety, setVariety] = useState(plant?.variety || "")
    const [plantedAt, setPlantedAt] = useState(plant?.planted_at || "")
    const [fertilizer, setFertilizer] = useState(plant?.fertilizer || "")
    const [plannedDays, setPlannedDays] = useState(plant?.planned_cultivation_days || "")
    const [potSize, setPotSize] = useState(plant?.pot_size || "")
    const [growthDays, setGrowthDays] = useState(plant?.growth_days || 0)
    const [floweringDays, setFloweringDays] = useState(plant?.flowering_days || 0)
    const [comments, setComments] = useState(plant?.comments || "")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)

    function validateForm() {
        if (!name.trim()) {
            return "Le nom de la plante est obligatoire."
        } if (!variety.trim()) {
            return "La variété est obligatoire."
        } if (!plantedAt) {
            return "La date de mise en terre est obligatoire."
        } if (!selectedGarden) {
            return "Aucun jardin n'est actuellement sélectionné."
        }
        return null
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            setShowErrorModal(true)
            return
        } if (!user) {
            setError("Tu dois être connecté.")
            setShowErrorModal(true)

            return
        }
        setLoading(true)
        const plantData = { name: name.trim(), variety: variety.trim(), planted_at: plantedAt, fertilizer: fertilizer.trim() || null, planned_cultivation_days: plannedDays ? Number(plannedDays) : null, pot_size: potSize ? Number(potSize) : null, growth_days: Number(growthDays) || 0, flowering_days: Number(floweringDays) || 0, comments: comments.trim() || null, }
        let response
        if (plant) {
            response = await supabase
                .from("plants")
                .update(plantData)
                .eq("id", plant.id)
                .select()
                .single()
        } else {
            response = await supabase.from("plants")
                .insert({ ...plantData, user_id: user.id, garden_id: selectedGarden.id, })
                .select()
                .single()
        } if (response.error) {
            console.error("Erreur lors de l'enregistrement de la plante :", response.error)
            setError("Impossible d'enregistrer la plante.")
            setShowErrorModal(true)
            setLoading(false)
            return
        }
        setLoading(false)
        if (onSaved) {
            onSaved(response.data)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5" >
                <FormField label="Nom de la plante" name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex : Plante #1" required />
                <FormField label="Variété de la graine" name="variety" value={variety} onChange={(event) => setVariety(event.target.value)} placeholder="Ex : Variété A" required />
                <FormField label="Date de mise en terre" name="plantedAt" type="date" value={plantedAt} onChange={(event) => setPlantedAt(event.target.value)} required />
                <FormField label="Engrais utilisé" name="fertilizer" value={fertilizer} onChange={(event) => setFertilizer(event.target.value)} placeholder="Ex : Engrais organique" />
                <FormField label="Temps de culture prévu (jours)" name="plannedDays" type="number" value={plannedDays} onChange={(event) => setPlannedDays(event.target.value)} placeholder="Ex : 90" /> <FormField label="Taille du pot" name="potSize" type="number" value={potSize} onChange={(event) => setPotSize(event.target.value)} placeholder="Ex : 11" />
                <FormField label="Nombre de jours de croissance" name="growthDays" type="number" value={growthDays} onChange={(event) => setGrowthDays(event.target.value)} />
                <FormField label="Nombre de jours de floraison" name="floweringDays" type="number" value={floweringDays} onChange={(event) => setFloweringDays(event.target.value)} />
                {/* Commentaires */}
                <div>
                    <label htmlFor="comments" className="mb-2 block text-sm font-medium text-stone-700" > Commentaires
                    </label>
                    <textarea id="comments" value={comments} onChange={(event) => setComments(event.target.value)} rows={5} placeholder="Observations, remarques..." className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none focus:border-green-600" />
                </div>
                {/* Photos - étape suivante */}
                <div>
                    <label htmlFor="photos" className="mb-2 block text-sm font-medium text-stone-700" > Photos
                    </label>
                    <input id="photos" type="file" accept="image/*" multiple className="w-full rounded-lg border border-stone-300 bg-white p-2" />
                    <p className="mt-1 text-xs text-stone-500"> Le stockage des photos dans Supabase Storage sera branché dans l'étape suivante. </p>
                </div>
                <Button type="submit" disabled={loading} > {loading ? "Enregistrement..." : plant ? "Enregistrer les modifications" : "Créer la plante"} </Button>
            </form>
            {showErrorModal && (<FormErrorModal title="Impossible d'enregistrer la plante" message={error} onCancel={() => setShowErrorModal(false)} onContinue={() => setShowErrorModal(false)} />
            )}
        </>
    )
}