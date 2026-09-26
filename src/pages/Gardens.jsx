import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import GardenForm from "../components/GardenForm"

export default function Gardens() {
    // --------------------------------------------------------
    // Liste des jardins récupérés depuis Supabase
    // --------------------------------------------------------

    const [gardens, setGardens] = useState([])

    // --------------------------------------------------------
    // Indique si nous sommes en train de charger les données
    // --------------------------------------------------------

    const [loading, setLoading] = useState(true)

    // --------------------------------------------------------
    // Permet d'afficher une éventuelle erreur
    // --------------------------------------------------------

    const [error, setError] = useState("")


    const [showForm, setShowForm] = useState(false)
    // --------------------------------------------------------
    // Récupération des jardins au chargement de la page
    // --------------------------------------------------------

    useEffect(() => {

        async function fetchGardens() {

            setLoading(true)
            setError("")

            const {
                data,
                error,
            } = await supabase
                .from("gardens")
                .select("*")
                .order("created_at", {
                    ascending: true,
                })


            // ------------------------------------------------
            // Gestion de l'erreur
            // ------------------------------------------------

            if (error) {

                console.error(
                    "Erreur lors du chargement des jardins :",
                    error
                )

                setError(
                    "Impossible de charger les jardins."
                )

                setLoading(false)

                return
            }


            // ------------------------------------------------
            // Les données reçues depuis Supabase
            // deviennent notre état React.
            // ------------------------------------------------

            setGardens(data)

            setLoading(false)
        }


        fetchGardens()

    }, [])


    // --------------------------------------------------------
    // Affichage pendant le chargement
    // --------------------------------------------------------

    if (loading) {

        return (
            <div className="p-8">

                <h2 className="text-3xl font-bold">
                    Mes jardins
                </h2>

                <p className="mt-4 text-stone-500">
                    Chargement des jardins...
                </p>

            </div>
        )
    }


    // --------------------------------------------------------
    // Affichage en cas d'erreur
    // --------------------------------------------------------

    if (error) {

        return (
            <div className="p-8">

                <h2 className="text-3xl font-bold">
                    Mes jardins
                </h2>

                <p className="mt-4 text-red-600">
                    {error}
                </p>

            </div>
        )
    }


    // --------------------------------------------------------
    // Affichage des jardins
    // --------------------------------------------------------

    return (



        <div className="p-8">

            <div className="mb-8">

                <h2 className="text-3xl font-bold">
                    Mes jardins
                </h2>

                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="rounded-lg bg-green-700 px-4 py-2 font-medium texxt-white hover:bg-green-800"
                >
                    Nouveau Jardin
                </button>
                <p className="mt-2 text-stone-500">
                    Tes jardins enregistrés dans Supabase
                </p>

            </div>


            {gardens.length === 0 ? (

                <div className="rounded-xl border border-dashed border-stone-300 bg-white p-8">

                    <p className="text-stone-500">
                        Aucun jardin pour le moment.
                    </p>

                </div>

            ) : (

                <div className="grid gap-4 md:grid-cols-2">

                    {gardens.map((garden) => (

                        <div
                            key={garden.id}
                            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
                        >

                            <h3 className="text-xl font-semibold">
                                🌱 {garden.name}
                            </h3>

                            <p className="mt-2 text-sm text-stone-500">
                                Créé le{" "}
                                {new Date(
                                    garden.created_at
                                ).toLocaleDateString("fr-FR")}
                            </p>

                        </div>

                    ))}

)}
                </div>


</div>
    )
}