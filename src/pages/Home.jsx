import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import { useGarden } from "../context/GardenContext"
import PublicHeader from "../components/public/PublicHeader"
import { PlantPot } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
    const { user } = useAuth()
    const { setSelectedGarden } = useGarden()
    const navigate = useNavigate()

    const [gardens, setGardens] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchGardens() {
            if (!user) {
                return
            }

            setLoading(true)
            setError("")

            const { data, error } = await supabase
                .from("gardens")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", {
                    ascending: true,
                })

            if (error) {
                console.error(
                    "Erreur lors du chargement des jardins :",
                    error
                )

                setError(
                    "Impossible de charger tes jardins."
                )

                setLoading(false)
                return
            }

            setGardens(data)
            setLoading(false)
        }

        fetchGardens()
    }, [user])

    function handleSelectGarden(garden) {
        setSelectedGarden(garden)
        // Pour le moment, on va simplement aller
        // vers le Dashboard.
        navigate("/dashboard")
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-stone-500">
                    Chargement de tes jardins...
                </p>
            </div>
        )
    }

    return (

        <div className="min-h-screen bg-stone-100 p-8">
            <PublicHeader />
            <main>
                {/* ====HERO=====*/}
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex justify-center flex-wrap items-center gap-12 lg:grid-cols-2">
                            {/* TEXTE */}
                            <div>
                                <h1 className="text-4xl font-bold leading-tight text-stone-900 md:text-5xl lg:text-6xl">
                                    Jardin Intérieur- Journal de suivi
                                </h1>
                                <p className="flex items-center justify-center tracking-widest text-green-700">
                                    Ton jardin, tes données, ton évolution
                                </p>
                            </div>
                            <div>

                                <h2 className="text-2xl font-bold leading-tight text-stone-600 md:text-3xl lg:text-3xl">
                                    Cultive, <br /> Observe, <br /> <span className="text-green-700">Partage</span>
                                </h2>
                                <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                                    Cette application de suivi de jardin intérieur te permet de suivre l'évolution de tes plantes, de documenter tes cultures et de découvrir les expériences d'autres cultivateurs.
                                </p>
                            </div>
                            {/* Boutons */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/register" className="rounded-lg bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800">
                                    Commencer gratuitement
                                </Link>
                                <Link to="/" className="rounded-lg border border-stone-300 bg-white px-6 py-3 font-medium text-stone-700 transition hover:bg-stone-100">
                                    Découvrir l'application
                                </Link>
                            </div>
                        </div>
                        {/* Illustration provisoire */}
                        <div className="flex justify-center">
                            <div className="flex aspect-square w-full max-w-lg items-center justify-center rounded-3xl bg-green-100">
                                <div className="text-center">
                                    <div className="text-8xl">
                                        <PlantPot />
                                    </div>
                                    <p className="mt-4 text-lg font-medium text-green-800">
                                        Ton jardin numérique
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* APERCU DE L'APPLICATION */}
                <section id="about" className="border-y border-stone-200 bg-white px-6 py-20">
                    <div className="mx-auto max-w-5xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
                            Pourquoi utiliser cette application ?
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
                            Un espace pour suivre chaque étape de la vie de chacune de vos plantes
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">
                            Organise tes jardins, suis tes plantes, conserve tes observations et retrouve facilement l'évolution de tes cultures.
                        </p>
                    </div>
                    <div>
                        <div className="mb-8">

                            {error && (
                                <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-6 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => navigate("/gardens")}
                                className="rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800"
                            >
                                + Nouveau jardin
                            </button>
                        </div>
                        {gardens.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
                                <p className="text-stone-500">
                                    Tu n'as encore aucun jardin.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => navigate("/gardens")}
                                    className="mt-4 rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800"
                                >
                                    Créer mon premier jardin
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {gardens.map((garden) => (
                                    <button
                                        key={garden.id}
                                        type="button"
                                        onClick={() =>
                                            handleSelectGarden(garden)
                                        }
                                        className="rounded-xl border border-stone-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <div className="mb-4 text-4xl">
                                            🌱
                                        </div>

                                        <h3 className="text-xl font-semibold text-stone-900">
                                            {garden.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-stone-500">
                                            Créé le{" "}
                                            {new Date(
                                                garden.created_at
                                            ).toLocaleDateString(
                                                "fr-FR"
                                            )}
                                        </p>
                                        <p className="mt-4 text-sm font-medium text-green-700">
                                            Ouvrir le jardin →
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </section>
            </main>


        </div >
    )
}
