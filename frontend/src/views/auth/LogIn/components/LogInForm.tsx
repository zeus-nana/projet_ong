import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { useAuthStore } from '@/store/authStore'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'

interface LoginFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type LoginFormSchema = {
    email: string
    password: string
}

const validationSchema: ZodType<LoginFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .email({ message: 'Please enter a valid email' })
        .min(1, { message: 'Please enter your email' }),
    password: z
        .string({ required_error: 'Please enter your password' })
        .min(1, { message: 'Please enter your password' }),
})

const LoginForm = (props: LoginFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const { disableSubmit = false, className, setMessage, passwordHint } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<LoginFormSchema>({
        defaultValues: {
            email: 'superadmin@propservice.com',
            password: 'Trinita#1',
        },
        resolver: zodResolver(validationSchema),
    })

    // Utilisation du store Zustand
    const { logIn } = useAuthStore()

    const onLogin = async (values: LoginFormSchema) => {
        const { email, password } = values

        if (!disableSubmit) {
            setSubmitting(true)

            const result = await logIn({ email, password })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }
            // La redirection est gérée par AuthInitializer via redirectPath
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onLogin)}>
                <FormItem label="Login" invalid={Boolean(errors.email)} errorMessage={errors.email?.message}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <Input placeholder="Login" autoComplete="off" {...field} />}
                    />
                </FormItem>
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                    className={classNames(passwordHint && 'mb-0', errors.password?.message && 'mb-8')}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput type="text" placeholder="Password" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                {passwordHint}
                <Button block loading={isSubmitting} variant="solid" type="submit">
                    {isSubmitting ? 'Loging in...' : 'Log In'}
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
