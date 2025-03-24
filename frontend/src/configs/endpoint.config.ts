export const apiPrefix = import.meta.env.VITE_API_URL + '/api/v1'

const endpointConfig = {
    auth: {
        login: `${apiPrefix}/auth/login`,
        logout: `${apiPrefix}/auth/logout`,
        getCurrentUser: `${apiPrefix}/auth/current-user`,
        forgotPassword: `${apiPrefix}/users/forgot-password`,
        resetPassword: `${apiPrefix}/users/reset-password`,
        changePassword: `${apiPrefix}/auth/change-password`,
    },
    features: {
        funder: `${apiPrefix}/funders`,
    },
}

export default endpointConfig
