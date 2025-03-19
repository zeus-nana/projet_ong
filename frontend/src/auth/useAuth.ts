import { useAuthStore } from '@/store/authStore'

/**
 * Hook personnalisé qui expose les fonctionnalités d'authentification via Zustand
 * Remplace le hook Context API précédent avec la même interface
 */
const useAuth = () => {
    const { authenticated, user, logIn, logOut } = useAuthStore()

    return {
        authenticated,
        user,
        logIn,
        logOut,
    }
}

export default useAuth
