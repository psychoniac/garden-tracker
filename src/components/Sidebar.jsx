import {
    LayoutDashboard,
    Sprout,
    BookOpen,
    Images,
} from "lucide-react"

import { NavLink } from "react-router-dom"

const navigation = [
    {
        name: "Tableau de bord",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Plantes",
        path: "/plants",
        icon: Sprout,
    },
    {
        name: "Journal",
        path: "/journal",
        icon: BookOpen,
    },
    {
        name: "Photos",
        path: "/photos",
        icon: Images,
    },
]

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen border-r border-stone-200 bg-white p-4">

            <div className="mb-8 px-3">
                <h1 className="text-xl font-bold text-green-800">
                    🌿 The Gold Line
                </h1>

                <p className="text-sm text-stone-500">
                    by TEE
                </p>
            </div>

            <nav className="space-y-1">

                {navigation.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                flex items-center gap-3 rounded-lg px-3 py-2
                text-sm font-medium
                ${isActive
                                    ? "bg-green-100 text-green-800"
                                    : "text-stone-600 hover:bg-stone-100"
                                }
                `
                            }
                        >
                            <Icon size={18} />

                            {item.name}
                        </NavLink>
                    )
                })}

            </nav>

        </aside>
    )
}
