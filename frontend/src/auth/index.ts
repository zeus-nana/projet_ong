export { default as useAuth } from './useAuth'

// Nous n'exportons plus AuthProvider car nous n'en avons plus besoin
// avec Zustand. Si tu as besoin de fonctionnalités comme la vérification
// d'authentification au démarrage, tu peux créer un composant AuthInitializer.
