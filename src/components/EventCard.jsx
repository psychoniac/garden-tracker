import {
    Sprout,
    Droplets,
    Lightbulb,
    Camera,
} from "lucide-react"

const icons = {
    plantation: Sprout,
    watering: Droplets,
    lighting: Lightbulb,
    observation: Camera,
}

export default function EventCard({ event }) {

    const Icon = icons[event.type] ?? Sprout

    return (
        <article className="relative rounded-xl border border-stone-200 bg-white p-5 shadow-sm">

            <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Icon size={20} />
                </div>

                <div>

                    <p className="text-sm text-stone-400">
                        {event.date}
                    </p>

                    <h3 className="mt-1 font-semibold">
                        {event.title}
                    </h3>

                    <p className="mt-2 text-sm text-stone-600">
                        {event.description}
                    </p>

                </div>

            </div>

        </article>
    )
}
