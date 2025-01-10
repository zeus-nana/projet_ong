import z from 'zod'

// Schéma de validation de l'environnement
const envSchema = z.object({
    // Server
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string().transform(Number),
    FRONTEND_URL: z.string().url(),
    DEBUG: z.string().optional(),

    // Database
    DB_HOST: z.string(),
    DB_PORT: z.string().transform(Number),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
    DATABASE_URL: z.string().url(),

    // Redis
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string().transform(Number),
    CHOKIDAR_USEPOLLING: z.string().transform((value) => value === 'true'),

    // JWT & Auth
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string(),
    JWT_COOKIE_EXPIRES_IN: z.string().transform(Number),
    TOKEN_SECRET: z.string(),
    ROUNDS: z.string().transform(Number),
})

// Constants pour les codes d'erreur HTTP
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
} as const

// Messages d'erreur standardisés
export const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect',
    ACCOUNT_INACTIVE: 'Ce compte est désactivé',
    UNAUTHORIZED: 'Non autorisé',
    SESSION_EXPIRED: 'Session expirée',
    INVALID_TOKEN: 'Token invalide',
    MUST_RESET_PASSWORD: 'Vous devez changer votre mot de passe',
    PASSWORD_REQUIREMENTS:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
} as const

export const RATE_LIMIT = {
    WINDOW_MS: 3600000, // 1 heure
    MAX_REQUESTS: 1000,
} as const

// Configuration exportée
const config = {
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG === 'true',
    server: {
        port: Number(process.env.PORT),
        frontendUrl: process.env.FRONTEND_URL,
    },
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        url: process.env.DATABASE_URL,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
    auth: {
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
            cookieExpiresIn: Number(process.env.JWT_COOKIE_EXPIRES_IN),
        },
        tokenSecret: process.env.TOKEN_SECRET,
        saltRounds: Number(process.env.ROUNDS),
    },
    fileWatcher: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
    },
    rateLimit: RATE_LIMIT,
} as const

// Validation de l'environnement
function handleConfigError(error: unknown) {
    if (error instanceof z.ZodError) {
        console.error('Erreurs de validation de la configuration :')
        error.errors.forEach((err) => {
            console.error(`- ${err.path.join('.')}: ${err.message}`)
        })
    } else if (error instanceof Error) {
        console.error('Erreur lors de la validation de la configuration :', error.message)
    } else {
        console.error('Une erreur inattendue est survenue lors de la validation de la configuration')
    }
    process.exit(1)
}

// Validation de l'environnement
try {
    envSchema.parse(process.env)
} catch (error) {
    handleConfigError(error)
}

export default config
