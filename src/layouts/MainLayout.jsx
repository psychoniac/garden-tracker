import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900">
            <div className="flex">

                <Sidebar />

                <main className="flex-1">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}
