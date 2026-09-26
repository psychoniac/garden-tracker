import EventCard from "../components/EventCard"
import { garden } from "../data/garden"

export default function Journal() {
    return (
        <div className="p-8">

            <div className="mb-8">

                <h2 className="text-3xl font-bold">
                    Journal
                </h2>

                <p className="mt-2 text-stone-500">
                    Historique du jardin
                </p>

            </div>

            <div className="max-w-3xl space-y-4">

                {garden.events.map((event) => (

                    <EventCard
                        key={event.id}
                        event={event}
                    />

                ))}

            </div>

        </div>
    )
}
