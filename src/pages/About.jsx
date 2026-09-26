import PublicHeader from "../components/public/PublicHeader"
import { useAuth } from "../context/AuthContext"

export default function About() {
    const { user, logout } = useAuth()

    return (
        <div className="p-8">
            <PublicHeader />
            <div className="flex justify-between items-center">
                <p>
                    Utilisateur connecté : {user?.email}
                </p>
                <button onClick={logout}
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    )
}