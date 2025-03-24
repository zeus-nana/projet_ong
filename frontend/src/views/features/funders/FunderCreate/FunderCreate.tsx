import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import FunderForm from '../FunderForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiCreateFunder } from '@/services/FunderService'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import type { FunderFormSchema } from '../FunderForm'

const FunderCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (values: FunderFormSchema) => {
        try {
            setIsSubmitting(true)
            await apiCreateFunder(values)
            toast.push(<Notification type="success">Bailleur de fonds créé avec succès!</Notification>, {
                placement: 'top-center',
            })
            navigate('/features/funders/funder-list')
        } catch (error) {
            toast.push(<Notification type="danger">Erreur lors de la création du bailleur de fonds</Notification>, {
                placement: 'top-center',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleConfirmDiscard = () => {
        navigate('/features/funders/funder-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <FunderForm onFormSubmit={handleFormSubmit}>
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Annuler
                            </Button>
                            <Button variant="solid" type="submit" loading={isSubmitting}>
                                Créer
                            </Button>
                        </div>
                    </div>
                </Container>
            </FunderForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Annuler la création"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>Êtes-vous sûr de vouloir annuler ? Les modifications ne seront pas sauvegardées.</p>
            </ConfirmDialog>
        </>
    )
}

export default FunderCreate
