export default function Button({
    children,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
        >
            {children}
        </button>
    )
}
