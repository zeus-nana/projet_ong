import { useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import ActionLink from '@/components/shared/ActionLink'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'

type ForgotPasswordProps = {
    logInUrl?: string
}

export const ForgotPasswordBase = ({ logInUrl = '/log-in' }: ForgotPasswordProps) => {
    const [emailSent, setEmailSent] = useState(false)
    const [message, setMessage] = useTimeOutMessage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleContinue = () => {
        navigate(logInUrl)
    }

    return (
        <div>
            <div className="mb-6">
                {emailSent ? (
                    <>
                        <h3 className="mb-2">Check your email</h3>
                        {/*<p className="font-semibold heading-text">*/}
                        {/*    We have sent a password recovery to your email*/}
                        {/*</p>*/}
                    </>
                ) : (
                    <>
                        <h3 className="mb-2">Forgot Password</h3>
                        <p className="font-semibold heading-text">
                            Please enter your email to receive a verification code
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <ForgotPasswordForm
                emailSent={emailSent}
                setMessage={setMessage}
                setEmailSent={setEmailSent}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
            >
                <Button block variant="solid" type="button" onClick={handleContinue}>
                    Continue
                </Button>
            </ForgotPasswordForm>
            <div className="mt-4 text-center">
                <span>Back to </span>
                <ActionLink
                    to={logInUrl}
                    className={`heading-text font-bold ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                    themeColor={false}
                >
                    Log in
                </ActionLink>
            </div>
        </div>
    )
}

const ForgotPassword = () => {
    return <ForgotPasswordBase />
}

export default ForgotPassword
