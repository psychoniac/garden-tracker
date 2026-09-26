export default function Modal({
    title,
    children,
    onClose,
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-stone-900">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-stone-400 hover:text-stone-700"
                        aria-label="Fermer"
                    >
                        ×
                    </button>
                </div>

                {/* Contenu */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
