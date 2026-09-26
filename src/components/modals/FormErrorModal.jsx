export default function FormErrorModal(
    { title = "Informations manquantes", message, onCancel, onContinue, }) {
    return (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                        !
                    </div>
                    <h2 className="text-xl font-semibold text-stone-900"> {title} </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600"> {message} </p>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-stone-300 px-4 py-2.5 font-medium text-stone-700 hover:bg-stone-50" >
                        Abandonner
                    </button>
                    <button type="button" onClick={onContinue} className="flex-1 rounded-lg bg-green-700 px-4 py-2.5 font-medium text-white hover:bg-green-800" >
                        Remplir le formulaire
                    </button>
                </div>
            </div>
        </div>
    )
}