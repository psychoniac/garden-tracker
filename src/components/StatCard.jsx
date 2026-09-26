export default function StatCard({
    label,
    value,
    icon,
}) {
    return (
        <div className="rounded-xl border border-stone-200 bg-white p-5">

            <div className="flex items-center justify-between">

                <span className="text-sm text-stone-500">
                    {label}
                </span>

                <span className="text-xl">
                    {icon}
                </span>

            </div>

            <p className="mt-3 text-3xl font-bold">
                {value}
            </p>

        </div>
    )
}
