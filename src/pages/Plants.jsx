import Header from "../components/Header"
import { garden } from "../data/garden"

export default function Plants() {
    return (
        <div className="p-8">
            <Header />
            <div className="mb-8">
                <h2 className="text-3xl font-bold">
                    Plantes
                </h2>

                <p className="mt-2 text-stone-500">
                    {garden.groups.length} groupes
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

                {garden.groups.map((group) => (

                    <div
                        key={group.id}
                        className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <h3 className="text-lg font-semibold">
                                🌱 {group.name}
                            </h3>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                                {group.quantity}
                            </span>

                        </div>

                        <p className="mt-3 text-sm text-stone-500">
                            {group.description}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    )
}
