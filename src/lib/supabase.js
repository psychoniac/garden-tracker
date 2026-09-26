import { createClient } from "@supabase/supabase-js"

// ------------------------------------------------------------
// Récupération des informations de connexion depuis .env.local
// ------------------------------------------------------------

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const supabasePublishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY


// ------------------------------------------------------------
// Création du client Supabase
//
// Ce client sera utilisé dans toute notre application
// pour communiquer avec Supabase.
//
// On l'exporte afin de pouvoir l'importer dans nos composants
// ou dans des fichiers de services.
// ------------------------------------------------------------

export const supabase = createClient(
    supabaseUrl,
    supabasePublishableKey
)