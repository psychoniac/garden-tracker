import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import { useGarden } from "../context/GardenContext"

export default function Dashboard() {
    const { user } = useAuth()
    const { selectedGarden } = useGarden()

    useEffect(() => {

        async function testSupabase() {

            // ------------------------------------------------
            // On demande à Supabase de récupérer les jardins.
            //
            // Pour l'instant, la table est vide.
            // Le but est simplement de vérifier que la
            // communication avec Supabase fonctionne.
            // ------------------------------------------------

            const { data, error } = await supabase
                .from("gardens")
                .select("*")

            console.log("Données reçues :", data)
            console.log("Erreur :", error)
        }

        testSupabase()

    }, [])

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold">
                Test Supabase
            </h1>
            <p className="mt-2 text-sm text-stone-500">
                Connecté en tant que : {user?.id}
            </p>
            <p className="mt-2 text-stone-500">
                Ouvre la console du navigateur pour voir le résultat.
            </p>
            {selectedGarden && (
                <div className="mb-6 rounded-xl bg-green-50 p-4">
                    <p className="text-sm text-green-700">
                        Jardin sélectionné
                    </p>

                    <h2 className="text-xl font-semibold text-green-900">
                        {selectedGarden.name}
                    </h2>
                </div>
            )}

        </div>
    )
}