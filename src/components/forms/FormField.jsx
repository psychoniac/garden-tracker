export default function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    error = "",
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-stone-700"
            >
                {label}
                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none transition ${error ? "border-red-400 focus:border-red-500" : "border-stone-300 focus:border-green-600"}`}
            />
            {error && (<p className="mt-1 text-sm text-red-600"> {error} </p>)}
        </div>
    )
}