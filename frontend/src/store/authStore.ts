import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiGetCurrentUser, apiLogIn, apiLogout } from '@/services/AuthService'
import type { User, LogInCredential, AuthResult } from '@/@types/auth'

interface AuthState {
    authenticated: boolean
    user: User
    loading: boolean
    redirectPath: string | null // Pour stocker le chemin de redirection
}

interface AuthActions {
    setUser: (user: User) => void
    setAuthenticated: (authenticated: boolean) => void
    setLoading: (loading: boolean) => void
    setRedirectPath: (path: string | null) => void // Pour définir le chemin de redirection
    checkAuth: () => Promise<boolean>
    logIn: (values: LogInCredential) => AuthResult
    logOut: () => Promise<void>
}

const initialUser: User = {
    id: undefined,
    avatar: '',
    username: '',
    email: '',
    phone: null,
    department: null,
    created_at: undefined,
    authenticated: false,
    authority: [],
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            authenticated: false,
            user: initialUser,
            loading: true,
            redirectPath: null, // Initialement pas de redirection

            setUser: (user: User) => set({ user }),
            setAuthenticated: (authenticated: boolean) => set({ authenticated }),
            setLoading: (loading: boolean) => set({ loading }),
            setRedirectPath: (path: string | null) => set({ redirectPath: path }),

            checkAuth: async () => {
                try {
                    const resp = await apiGetCurrentUser(get().user)
                    if (resp.status === 'success' && resp.user) {
                        set({
                            user: resp.user,
                            authenticated: resp.user.authenticated,
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.error('Error during checkAuth:', error)
                    return false
                }
            },

            logIn: async (values: LogInCredential): AuthResult => {
                try {
                    const resp = await apiLogIn(values)

                    // Gérer le cas où l'utilisateur doit réinitialiser son mot de passe
                    if (resp.user?.must_reset_password) {
                        set({
                            user: resp.user,
                            authenticated: false,
                            redirectPath: '/reset-password', // Stocker le chemin au lieu de rediriger directement
                        })

                        return {
                            status: 'warning',
                            message: 'Please reset your password',
                        }
                    }

                    if (resp.status === 'success' && resp.user) {
                        set({
                            user: resp.user,
                            authenticated: resp.user.authenticated,
                            // Stocker le chemin de redirection au lieu de rediriger directement
                            redirectPath:
                                new URLSearchParams(window.location.search).get('REDIRECT_URL_KEY') || '/home',
                        })

                        return {
                            status: 'success',
                            message: '',
                        }
                    }

                    return {
                        status: 'failed',
                        message: 'Unable to log in',
                    }
                } catch (error) {
                    const err = error as { response?: { data?: { message?: string } } }
                    return {
                        status: 'failed',
                        message: err?.response?.data?.message || String(error),
                    }
                }
            },

            logOut: async () => {
                try {
                    const response = await apiLogout()
                    if (response.status === 'success') {
                        set({
                            user: initialUser,
                            authenticated: false,
                            redirectPath: '/log-in', // Stocker le chemin au lieu de rediriger directement
                        })
                    }
                } catch (error) {
                    console.error('Logout failed:', error)
                    // Réinitialiser l'état même si l'appel API échoue
                    set({
                        user: initialUser,
                        authenticated: false,
                        redirectPath: '/log-in', // Stocker le chemin au lieu de rediriger directement
                    })
                }
            },
        }),
        {
            name: 'auth-storage',
            // Ne persister que les données nécessaires
            partialize: (state) => ({
                user: state.user,
                authenticated: state.authenticated,
            }),
        },
    ),
)
