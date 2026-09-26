
import { createContext, useContext, useState } from "react"

const GardenContext = createContext(null)

export function GardenProvider({ children }) {
    const [selectedGarden, setSelectedGarden] = useState(null)

    return (
        <GardenContext.Provider
            value={{
                selectedGarden,
                setSelectedGarden,
            }}
        >
            {children}
        </GardenContext.Provider>
    )
}

export function useGarden() {
    const context = useContext(GardenContext)

    if (!context) {
        throw new Error(
            "useGarden doit être utilisé à l'intérieur de GardenProvider"
        )
    }

    return context
}
