import { useAuth } from "../context/AuthContext"

export default function Header() {
    const { user, logout } = useAuth()

    return (
        <header className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-4">
            <div>
                <h1 className="font-semibold">
                    Garden tracker
                </h1>
                <p className="text-sm text-stone-500">
                    {console.log(user)}
                    <span>
                        {user?.email}
                    </span>
                    <span>
                        {user?.id}
                    </span>
                </p>
            </div>
            <button onClick={logout}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
            >
                Se déconnecter
            </button>
        </header>
    )
}
