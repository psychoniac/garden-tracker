import { Link } from "react-router-dom"

export default function PublicHeader() {
    return (
        <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Nom de l'application */}
                <Link
                    to="/"
                    className="text-xl font-bold text-green-800"
                >
                    Jardin Intérieur- Journal de suivi
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link
                        to="/about"
                        className="text-sm font-medium text-stone-600 transition hover:text-green-700"
                    >
                        À propos
                    </Link>

                    <Link
                        to="/login"
                        className="text-sm font-medium text-stone-600 transition hover:text-green-700"
                    >
                        Connexion
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
                    >
                        Inscription
                    </Link>
                </nav>
            </div>
        </header>
    )
}
