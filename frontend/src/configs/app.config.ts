export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/log-in',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: true,
}

export default appConfig
