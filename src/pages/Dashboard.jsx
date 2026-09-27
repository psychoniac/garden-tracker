import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"


export default function Dashboard() {
    const { user } = useAuth()

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
        <div className="p-10 border text-white bg-green-300">
            <h1 className="text-3xl font-bold text-center">
                Dashboard de {user?.email}
            </h1>
        </div>
    )
}