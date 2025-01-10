export interface IUser {
    id: number
    username: string
    password: string
    email: string
    phone: string | null
    department: string | null
    active: boolean
    must_reset_password: boolean
    created_by: number | null
    updated_by: number | null
    created_at: Date
    updated_at: Date
    authenticated: boolean
}

export interface IUserCreationAttributes {
    username: string
    email: string
    password: string
    phone?: string
    department?: string
    created_by: number
}

export interface IUserUpdateAttributes {
    username?: string
    email?: string
    phone?: string
    department?: string
    active?: boolean
    must_reset_password?: boolean
    updated_by: number
}

export interface IUserValidationResult {
    isValid: boolean
    message: string
}

export interface IForgotPasswordResult {
    user: IUser
    temporaryPassword: string
}

export interface IResetPasswordResult {
    message: string
}
