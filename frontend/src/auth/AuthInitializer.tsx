import { useEffect, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import appConfig from '@/configs/app.config'

interface AuthInitializerProps {
    children: ReactNode
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { checkAuth, loading, setLoading, redirectPath, setRedirectPath } = useAuthStore()

    // Gérer les redirections stockées dans le store
    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath)
            // Important: réinitialiser le chemin après la redirection
            setRedirectPath(null)
        }
    }, [redirectPath, navigate, setRedirectPath])

    // Vérification d'authentification au chargement
    useEffect(() => {
        const initAuth = async () => {
            // Ne pas vérifier l'authentification si on est déjà sur la page de login
            // ou s'il y a déjà une redirection en cours
            if (location.pathname === appConfig.unAuthenticatedEntryPath || redirectPath) {
                setLoading(false)
                return
            }

            const isAuthenticated = await checkAuth()

            if (!isAuthenticated) {
                // Utiliser navigate au lieu de window.location.href
                navigate(appConfig.unAuthenticatedEntryPath)
            }

            setLoading(false)
        }

        initAuth()
    }, [checkAuth, location.pathname, navigate, setLoading, redirectPath])

    if (loading) {
        return null // Ou afficher un spinner de chargement
    }

    return <>{children}</>
}

export default AuthInitializer
